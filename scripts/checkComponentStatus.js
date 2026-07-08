/**
 * Validates `docs/app/data/componentStatus.ts` against the source tree.
 *
 * That file drives the badges and the "production ready" summary on the public
 * documentation site. Whatever can be derived from `src/` should never be able to
 * drift from it:
 *
 *   - `name` must be a real component directory.
 *   - every public non-`*Block` component must have an entry.
 *   - `hasBlock` must agree with the existence of `<Name>Block/`.
 *   - each entry's slug must be unique and must resolve to a documentation page
 *     in both languages, under the category directory the entry declares.
 *   - every entry must appear in the generated `componentCoverage.ts`.
 *
 * Whether those generated numbers are current is `pnpm run status:sync --check`'s
 * job. Re-deriving them here, with the same function that writes them, would only
 * prove that function agrees with itself.
 *
 * The remaining fields (`docs`, `darkMode`, `responsive`, `jsdoc`, `typescript`)
 * are claims rather than facts. They have no measured source yet.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import ts from 'typescript';
import { SPARTAN } from './coverage.js';

const DATA = 'docs/app/data';
const STATUS = `${DATA}/componentStatus.ts`;
const DOCS = (lang) => `docs/content/${lang}/2.components`;

/**
 * Runs the real modules rather than pattern-matching their source, so `nameToSlug`,
 * the defaults and the `slug` override are exercised exactly as the site does.
 *
 * Transpiled output is written to a temp directory rather than imported from a
 * `data:` URL, because a data URL has no base against which to resolve
 * `./componentCoverage` — and the extension has to be added, because Node ESM does
 * not resolve extensionless specifiers.
 */
const loadStatus = async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'spartan-status-'));

    const emit = (name, rewrite = (source) => source) => {
        const { outputText } = ts.transpileModule(fs.readFileSync(`${DATA}/${name}.ts`, 'utf8'), {
            compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
        });
        fs.writeFileSync(path.join(directory, `${name}.mjs`), rewrite(outputText));
    };

    emit('componentCoverage');
    emit('componentStatus', (source) => source.replace("'./componentCoverage'", "'./componentCoverage.mjs'"));

    const load = (name) => import(pathToFileURL(path.join(directory, `${name}.mjs`)).href);

    try {
        const [status, coverage] = await Promise.all([load('componentStatus'), load('componentCoverage')]);
        return { components: status.components, componentCoverage: coverage.componentCoverage };
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
};

const directories = (dir) =>
    fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);

/** `dataInput` -> `data-input`, matching the directory names under `2.components/`. */
const categoryToDirectory = (category) => category.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Maps `input-password` to the category directory holding `7.input-password.md`. */
const docSlugs = (lang) => {
    const root = DOCS(lang);
    const slugs = new Map();
    for (const category of directories(root))
        for (const file of fs.readdirSync(path.join(root, category)))
            if (file.endsWith('.md'))
                slugs.set(file.replace(/^\d+\./, '').replace(/\.md$/, ''), category.replace(/^\d+\./, ''));
    return slugs;
};

const problems = [];
const fail = (message) => problems.push(message);

const { components, componentCoverage } = await loadStatus();

const componentDirs = new Set(directories(SPARTAN));
const blockDirs = new Set([...componentDirs].filter((name) => name.endsWith('Block')));
const declared = new Map(components.map((c) => [c.name, c]));

// A. Every entry names a component that exists.
for (const { name } of components) {
    if (!componentDirs.has(name)) fail(`entry "${name}" has no directory at ${SPARTAN}/${name}`);
}

// B. Every non-Block component has an entry. Blocks are documented inside the
//    page of the component they wrap, and are surfaced through `hasBlock`.
for (const name of componentDirs) {
    if (blockDirs.has(name)) continue;
    if (!declared.has(name)) fail(`component "${name}" has no entry in ${STATUS}`);
}

// C. `hasBlock` agrees with the source tree, in both directions.
for (const { name, hasBlock } of components) {
    const exists = blockDirs.has(`${name}Block`);
    if (hasBlock && !exists) fail(`entry "${name}" sets hasBlock, but ${SPARTAN}/${name}Block does not exist`);
    if (!hasBlock && exists) fail(`${SPARTAN}/${name}Block exists, but entry "${name}" does not set hasBlock`);
}

// D. Slugs are unique, E. resolve to a page in both languages, and F. sit under
//    the category directory the entry declares — the docs route is built from it.
const pages = { en: docSlugs('en'), es: docSlugs('es') };
const seen = new Set();
for (const { name, slug, category } of components) {
    if (seen.has(slug)) fail(`slug "${slug}" is claimed by more than one entry (last: "${name}")`);
    seen.add(slug);

    for (const [lang, slugs] of Object.entries(pages)) {
        if (!slugs.has(slug)) {
            fail(`entry "${name}" resolves to slug "${slug}", which has no ${lang.toUpperCase()} documentation page`);
            continue;
        }
        const expected = categoryToDirectory(category);
        const actual = slugs.get(slug);
        if (actual !== expected)
            fail(
                `entry "${name}" declares category "${category}", but its ${lang.toUpperCase()} page lives under "${actual}"`,
            );
    }
}

// G. Every entry appears in the generated coverage. An absent one silently reads as
//    0, which would look like a component with no tests rather than a broken merge.
//    Whether the generated numbers are current is `status:sync --check`'s job, not
//    this script's — asserting them here with the same function that writes them
//    would only prove the function agrees with itself.
for (const { name } of components) {
    if (!(name in componentCoverage))
        fail(`entry "${name}" is missing from ${DATA}/componentCoverage.ts; run \`pnpm run status:sync\``);
}

if (problems.length === 0) {
    const blocks = components.filter((c) => c.hasBlock).length;
    console.log(
        `✓ componentStatus.ts agrees with src/ (${components.length} components, ${blocks} with a Block variant)`,
    );
    process.exit(0);
}

console.error(`\n${problems.length} inconsistency(ies) between ${STATUS} and the source tree:\n`);
for (const problem of problems) console.error(`  ${problem}`);
console.error('');
process.exit(1);
