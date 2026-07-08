import { rimrafSync } from 'rimraf';
import fs from 'fs';
import path from 'path';

const DIST = './dist';
const TYPES = `${DIST}/types`;

/**
 * `vue-tsc` mirrors `src/` into `dist/types/`, but the published layout is
 * flatter: components move from `components/spartan/X` to `components/X`, and
 * internals from `components/internal` to `internal`. Every module specifier
 * inside the emitted `.d.ts` files is relative to the *source* depth, so each
 * one has to be resolved against the mirror and re-pointed at the new layout.
 */
const remap = (rel) => {
    if (rel === 'components/spartan') return 'components';
    if (rel === 'components/internal') return 'internal';
    if (rel.startsWith('components/spartan/')) return `components/${rel.slice('components/spartan/'.length)}`;
    if (rel.startsWith('components/internal/')) return `internal/${rel.slice('components/internal/'.length)}`;
    return rel;
};

/** Path aliases from `tsconfig.json`, expressed as paths inside the mirror. */
const resolveAlias = (spec) => {
    if (spec === '@internal') return 'components/internal';
    if (spec === '@spartan') return 'components/spartan';
    if (spec.startsWith('@internal/')) return `components/internal/${spec.slice('@internal/'.length)}`;
    if (spec.startsWith('@spartan/')) return `components/spartan/${spec.slice('@spartan/'.length)}`;
    if (spec.startsWith('@/')) return spec.slice(2);
    return null;
};

const walk = (dir, acc = []) => {
    if (!fs.existsSync(dir)) return acc;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, acc);
        else acc.push(full);
    }
    return acc;
};

const posix = (p) => p.split(path.sep).join('/');

/**
 * Resolves a mirror-relative module path to the declaration it points at, and
 * returns the specifier suffix Node16/bundler resolution both accept.
 * `x` -> `x.js` when `x.d.ts` exists; `x` -> `x/index.js` when it is a folder.
 */
const resolveTarget = (mirrorRel) => {
    if (fs.existsSync(path.join(TYPES, `${mirrorRel}.d.ts`))) return { rel: mirrorRel, suffix: '.js' };
    if (fs.existsSync(path.join(TYPES, mirrorRel, 'index.d.ts'))) return { rel: `${mirrorRel}/index`, suffix: '.js' };
    return null;
};

const rewriteSpecifiers = (mirrorRelFile, distRelFile, source) => {
    const mirrorDir = path.posix.dirname(posix(mirrorRelFile));
    const distDir = path.posix.dirname(posix(distRelFile));
    let unresolved = 0;

    const updated = source.replace(/(from\s*|import\s*\(\s*)(['"])([^'"]+)\2/g, (match, prefix, quote, spec) => {
        const aliased = resolveAlias(spec);
        const isRelative = spec.startsWith('.');
        if (!aliased && !isRelative) return match; // bare package specifier

        const mirrorRel = aliased ?? path.posix.normalize(path.posix.join(mirrorDir, spec));
        const target = resolveTarget(mirrorRel);
        if (!target) {
            unresolved++;
            return match;
        }

        let next = path.posix.relative(distDir, remap(target.rel));
        if (!next.startsWith('.')) next = `./${next}`;
        return `${prefix}${quote}${next}${target.suffix}${quote}`;
    });

    return { updated, unresolved };
};

/**
 * The runtime barrel. This used to be a renamed `.d.ts`, which only worked
 * because its contents happened to be pure re-exports, and it emitted
 * extensionless specifiers that Node ESM cannot resolve.
 */
const writeComponentsBarrel = () => {
    const components = fs
        .readdirSync(`${DIST}/components`, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && fs.existsSync(`${DIST}/components/${entry.name}/index.js`))
        .map((entry) => entry.name)
        .sort();

    fs.writeFileSync(
        `${DIST}/components/index.js`,
        components.map((c) => `export * from './${c}/index.js';`).join('\n') + '\n',
    );

    return components.length;
};

/**
 * `cp -r src/locales dist/locales` ships `index.ts` plus raw `.json` files.
 * Re-exporting JSON from an ESM entrypoint needs import attributes that not
 * every bundler and Node version supports, so inline the messages instead.
 */
const writeLocales = () => {
    const locales = fs
        .readdirSync(`${DIST}/locales`)
        .filter((file) => file.endsWith('.json'))
        .map((file) => path.basename(file, '.json'))
        .sort();

    const js = locales
        .map((l) => {
            const messages = JSON.parse(fs.readFileSync(`${DIST}/locales/${l}.json`, 'utf8'));
            return `export const ${l} = ${JSON.stringify(messages)};`;
        })
        .join('\n');

    const dts = [
        'export type TSpartanMessages = { $spartan: Record<string, any> };',
        ...locales.map((l) => `export declare const ${l}: TSpartanMessages;`),
    ].join('\n');

    fs.writeFileSync(`${DIST}/locales/index.js`, `${js}\n`);
    fs.writeFileSync(`${DIST}/locales/index.d.ts`, `${dts}\n`);
    rimrafSync(`${DIST}/locales/index.ts`);

    return locales;
};

// Declarations that never belong in the published package.
const EXCLUDED = ['locales', 'vitest-setup.d.ts', 'index.d.ts'];

/**
 * Asset barrels re-export `*.svg` modules that only exist at build time — the
 * icons are inlined into the JavaScript bundle. Their declarations are not
 * reachable from any public entrypoint, and shipping them would leave dangling
 * imports in the published types.
 */
const ASSET_IMPORT = /(?:from\s*|import\s*\(\s*)['"][^'"]+\.(?:svg|png|jpe?g|webp|css)['"]/;

(async () => {
    console.log('assembling type declarations...');

    // Ship the whole declaration tree. The previous implementation copied only
    // index/types/<Component>.vue declarations, dropping every `styles.d.ts`,
    // so CVA variant unions silently degraded to `any` in consumer projects.
    const sources = walk(TYPES)
        .map((file) => posix(path.relative(TYPES, file)))
        .filter((rel) => rel.endsWith('.d.ts'))
        .filter((rel) => !EXCLUDED.some((skip) => rel === skip || rel.startsWith(`${skip}/`)));

    let unresolvedTotal = 0;
    let shipped = 0;
    let skipped = 0;
    for (const mirrorRel of sources) {
        const source = fs.readFileSync(path.join(TYPES, mirrorRel), 'utf8');
        if (ASSET_IMPORT.test(source)) {
            skipped++;
            continue;
        }

        const distRel = remap(mirrorRel);
        const { updated, unresolved } = rewriteSpecifiers(mirrorRel, distRel, source);
        unresolvedTotal += unresolved;

        const out = path.join(DIST, distRel);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, updated);
        shipped++;
    }
    console.log(`  ✓ ${shipped} declarations shipped (${skipped} asset barrels skipped)`);

    // A dangling specifier means the published types reference a file that is
    // not in the tarball. Never ship that.
    if (unresolvedTotal) {
        console.error(`\n${unresolvedTotal} module specifiers in the emitted declarations could not be resolved.`);
        process.exit(1);
    }

    const componentCount = writeComponentsBarrel();
    console.log(`  ✓ components barrel: ${componentCount} components`);

    const locales = writeLocales();
    console.log(`  ✓ locales inlined: ${locales.join(', ')}`);

    rimrafSync(TYPES);

    // Fail loudly rather than publishing a package with a dead `exports` map.
    const required = [
        `${DIST}/components/index.js`,
        `${DIST}/components/index.d.ts`,
        `${DIST}/locales/index.js`,
        `${DIST}/locales/index.d.ts`,
        `${DIST}/expose/i18n.js`,
        `${DIST}/expose/i18n.d.ts`,
        `${DIST}/styles.css`,
    ];
    const missing = required.filter((file) => !fs.existsSync(file));
    if (missing.length) {
        console.error(`\nBuild is missing files referenced by package.json "exports":\n${missing.join('\n')}`);
        process.exit(1);
    }

    console.log('build sanitized');
})();
