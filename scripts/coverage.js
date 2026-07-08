/**
 * Statement coverage per component, aggregated over every file in its directory,
 * read from the report `pnpm run test:ci` produces.
 *
 * Shared by `checkComponentStatus.js` (which asserts) and `syncComponentStatus.js`
 * (which writes), so the two can never compute the number differently.
 */
import fs from 'fs';
import path from 'path';

export const SPARTAN = 'src/components/spartan';
export const COVERAGE = 'coverage/coverage-summary.json';

/**
 * Truncated rather than rounded: 99.6% must not be advertised as 100.
 * Returns null when no coverage run is available.
 */
export const measuredCoverage = () => {
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
