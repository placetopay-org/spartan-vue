/**
 * Validates `docs/app/data/componentStatus.ts` against the source tree.
 *
 * That file drives the badges and the "production ready" summary on the public
 * documentation site, and every field in it is written by hand. The ones that
 * are derivable from `src/` should never be able to drift:
 *
 *   - `name` must be a real component directory.
 *   - every public non-`*Block` component must have an entry.
 *   - `hasBlock` must agree with the existence of `<Name>Block/`.
 *   - each entry's slug must be unique and must resolve to a documentation page
 *     in both languages, under the category directory the entry declares.
 *   - `tests` must be the coverage actually measured for the component, whenever
 *     a coverage run is available.
 *
 * The remaining fields (`docs`, `darkMode`, `responsive`, `jsdoc`, `typescript`)
 * are still claims rather than facts. They have no measured source yet.
 */
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const SPARTAN = 'src/components/spartan';
const STATUS = 'docs/app/data/componentStatus.ts';
const COVERAGE = 'coverage/coverage-summary.json';
const DOCS = (lang) => `docs/content/${lang}/2.components`;

/** Runs the real module rather than pattern-matching its source. */
const loadStatus = async () => {
    const source = fs.readFileSync(STATUS, 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
    });
    return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
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

/**
 * Statement coverage per component, aggregated over every file in its directory.
 * Truncated rather than rounded: 99.6% must not be advertised as 100.
 * Returns null when no coverage run is available.
 */
const measuredCoverage = () => {
    if (!fs.existsSync(COVERAGE)) return null;

    const summary = JSON.parse(fs.readFileSync(COVERAGE, 'utf8'));
    const root = path.resolve(SPARTAN);
    const totals = new Map();

    for (const [file, data] of Object.entries(summary)) {
        if (file === 'total') continue;
        const relative = path.relative(root, file);
        if (relative.startsWith('..')) continue;

        const component = relative.split(path.sep)[0];
        const running = totals.get(component) ?? { covered: 0, total: 0 };
        running.covered += data.statements.covered;
        running.total += data.statements.total;
        totals.set(component, running);
    }

    return new Map(
        [...totals].map(([component, { covered, total }]) => [
            component,
            total === 0 ? 100 : Math.floor((covered / total) * 100),
        ]),
    );
};

const problems = [];
const fail = (message) => problems.push(message);

const { components } = await loadStatus();

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

// G. `tests` is the measured coverage, not a number somebody typed. Skipped when
//    no coverage run is present, so the check stays usable before the suite runs.
const coverage = measuredCoverage();
if (coverage) {
    for (const { name, tests } of components) {
        const measured = coverage.get(name);
        if (measured === undefined) {
            fail(`entry "${name}" has no coverage data; was it excluded from the run?`);
        } else if (tests !== measured) {
            fail(`entry "${name}" declares tests: ${tests}, but measured coverage is ${measured}`);
        }
    }
}

if (problems.length === 0) {
    const blocks = components.filter((c) => c.hasBlock).length;
    const source = coverage ? 'coverage measured' : `coverage unverified, no ${COVERAGE}`;
    console.log(
        `✓ componentStatus.ts agrees with src/ (${components.length} components, ${blocks} with a Block variant; ${source})`,
    );
    process.exit(0);
}

console.error(`\n${problems.length} inconsistency(ies) between ${STATUS} and the source tree:\n`);
for (const problem of problems) console.error(`  ${problem}`);
console.error('');
process.exit(1);
