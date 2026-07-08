/**
 * Generates `docs/app/data/componentCoverage.ts` from the coverage report.
 *
 *   pnpm run test:ci             # produces coverage/coverage-summary.json
 *   pnpm run status:sync         # writes the generated file
 *   pnpm run status:sync --check # fails if the committed file is stale
 *
 * The generated file is the only place a coverage number lives. `componentStatus.ts`
 * holds the human judgements — `docs`, `darkMode`, `responsive`, `figmaLink` — and
 * imports the measurements. Nobody edits a number by hand, and `--check` is what
 * catches a commit where somebody forgot to regenerate.
 */
import fs from 'fs';
import { measuredCoverage, COVERAGE } from './coverage.js';

const GENERATED = 'docs/app/data/componentCoverage.ts';

const render = (coverage) => {
    const entries = [...coverage]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([component, percentage]) => `    ${component}: ${percentage},`)
        .join('\n');

    return [
        '// GENERATED FILE — do not edit.',
        '// Statement coverage per component, truncated. Run `pnpm run status:sync` to refresh,',
        '// after `pnpm run test:ci` has produced the coverage report.',
        '',
        'export const componentCoverage: Record<string, number> = {',
        entries,
        '};',
        '',
    ].join('\n');
};

const coverage = measuredCoverage();
if (!coverage) {
    console.error(`\nNo ${COVERAGE}. Run \`pnpm run test:ci\` first.\n`);
    process.exit(1);
}

const generated = render(coverage);
const committed = fs.existsSync(GENERATED) ? fs.readFileSync(GENERATED, 'utf8') : null;

if (process.argv.includes('--check')) {
    if (committed === generated) {
        console.log(`✓ ${GENERATED} matches the measured coverage`);
        process.exit(0);
    }
    console.error(`\n${GENERATED} is stale. Run \`pnpm run status:sync\`.\n`);
    process.exit(1);
}

if (committed === generated) {
    console.log(`✓ ${GENERATED} already matches the measured coverage`);
    process.exit(0);
}

fs.writeFileSync(GENERATED, generated);
console.log(`✓ wrote ${GENERATED} (${coverage.size} components)`);
