/**
 * Fails when `src/` imports a package that `package.json` does not declare.
 *
 * `.npmrc` sets `shamefully-hoist=true` for Docus, which flattens every
 * transitive dependency into the root `node_modules`. That makes undeclared
 * imports resolve locally and in CI, while breaking any consumer whose package
 * manager isolates dependencies properly — `@primevue/icons`, a transitive of
 * `primevue`, shipped that way.
 */
import fs from 'fs';
import path from 'path';

const SRC = 'src';
const PKG = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const declared = new Set([
    ...Object.keys(PKG.dependencies ?? {}),
    ...Object.keys(PKG.devDependencies ?? {}),
    ...Object.keys(PKG.peerDependencies ?? {}),
]);

// Path aliases from tsconfig.json, resolved by the bundler rather than Node.
const ALIASES = ['@/', '@spartan', '@internal'];

const IMPORT = /(?:^|[\s;=({[,])(?:import|from|require)\s*\(?\s*['"]([^'"]+)['"]/gm;

// Tests are not published, and their prose (`... removes the field from "Add" list`)
// trips the import regex. Only the shipped sources matter here.
const isSource = (name) => /\.(ts|js|vue)$/.test(name) && !/\.test\.ts$/.test(name) && name !== 'vitest-setup.ts';

const walk = (dir, acc = []) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, acc);
        else if (isSource(entry.name)) acc.push(full);
    }
    return acc;
};

/** `@scope/name/deep` -> `@scope/name`; `name/deep` -> `name`. */
const packageName = (specifier) =>
    specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];

const phantoms = new Map();

for (const file of walk(SRC)) {
    const source = fs.readFileSync(file, 'utf8');
    for (const [, specifier] of source.matchAll(IMPORT)) {
        if (specifier.startsWith('.') || specifier.startsWith('node:')) continue;
        if (ALIASES.some((alias) => specifier.startsWith(alias))) continue;

        const name = packageName(specifier);
        if (declared.has(name)) continue;

        if (!phantoms.has(name)) phantoms.set(name, new Set());
        phantoms.get(name).add(file);
    }
}

if (phantoms.size === 0) {
    console.log(`✓ no phantom dependencies in ${SRC}/`);
    process.exit(0);
}

console.error(`\n${phantoms.size} package(s) imported by ${SRC}/ but not declared in package.json:\n`);
for (const [name, files] of phantoms) {
    console.error(`  ${name}`);
    for (const file of files) console.error(`      ${file}`);
}
console.error('\nDeclare them, or stop importing them.\n');
process.exit(1);
