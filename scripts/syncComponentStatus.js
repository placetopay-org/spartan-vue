/**
 * Writes the measured coverage into the `tests` field of every entry in
 * `docs/app/data/componentStatus.ts`. Nobody should ever type that number.
 *
 * The value is kept inside componentStatus.ts rather than in a generated JSON the
 * file imports, because `checkComponentStatus.js` executes the real module to
 * validate it, and Node ESM cannot import JSON without an import attribute that
 * `ts.transpileModule` does not emit — `ERR_IMPORT_ATTRIBUTE_MISSING`. The same
 * defect this repository shipped in `dist/locales/index.js`.
 *
 *   pnpm run test:ci      # produces coverage/coverage-summary.json
 *   pnpm run status:sync  # writes the numbers
 *   pnpm run check:status # fails if they drifted
 */
import fs from 'fs';
import { measuredCoverage, COVERAGE } from './coverage.js';

const STATUS = 'docs/app/data/componentStatus.ts';

const coverage = measuredCoverage();
if (!coverage) {
    console.error(`\nNo ${COVERAGE}. Run \`pnpm run test:ci\` first.\n`);
    process.exit(1);
}

let source = fs.readFileSync(STATUS, 'utf8');
const changes = [];
const missing = [];

// Rewrite the `tests:` that belongs to each entry: the first one after its `name:`
// and before the next entry begins.
source = source.replace(
    /(name: '(S\w+)',(?:(?!\bname:)[\s\S])*?tests: )(\d+)(,)/g,
    (match, head, name, current, tail) => {
        const measured = coverage.get(name);
        if (measured === undefined) {
            missing.push(name);
            return match;
        }
        if (Number(current) !== measured) changes.push(`${name}: ${current} -> ${measured}`);
        return `${head}${measured}${tail}`;
    },
);

if (missing.length) {
    console.error(`\nNo coverage data for: ${missing.join(', ')}\n`);
    process.exit(1);
}

if (changes.length === 0) {
    console.log('✓ componentStatus.ts already matches the measured coverage');
    process.exit(0);
}

fs.writeFileSync(STATUS, source);
console.log(`✓ updated ${changes.length} entr${changes.length === 1 ? 'y' : 'ies'} in ${STATUS}`);
for (const change of changes) console.log(`    ${change}`);
