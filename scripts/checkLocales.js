/**
 * Fails when the locale catalogs in `src/locales/` drift out of sync — i.e. a
 * key added to one language but forgotten in the others. Every component reads
 * its text under the `$spartan` namespace, so a missing key ships a raw
 * `$spartan.foo.bar` string to that language's users. `en.json` is the
 * reference; every other locale must have exactly its key set.
 */
import fs from 'fs';
import path from 'path';

const DIR = 'src/locales';
const REFERENCE = 'en';

const load = (locale) => JSON.parse(fs.readFileSync(path.join(DIR, `${locale}.json`), 'utf8'));

/** Flattens a nested catalog into a set of dot-joined leaf paths. */
const flatten = (obj, prefix = '', acc = new Set()) => {
    for (const [key, value] of Object.entries(obj)) {
        const next = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) flatten(value, next, acc);
        else acc.add(next);
    }
    return acc;
};

const locales = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.basename(file, '.json'))
    .sort();

if (!locales.includes(REFERENCE)) {
    console.error(`\nReference locale ${REFERENCE}.json is missing from ${DIR}/.\n`);
    process.exit(1);
}

const reference = flatten(load(REFERENCE));
let drifted = false;

for (const locale of locales) {
    if (locale === REFERENCE) continue;

    const keys = flatten(load(locale));
    const missing = [...reference].filter((key) => !keys.has(key));
    const extra = [...keys].filter((key) => !reference.has(key));

    if (missing.length || extra.length) {
        drifted = true;
        console.error(`\n${locale}.json differs from ${REFERENCE}.json:`);
        for (const key of missing) console.error(`  - missing: ${key}`);
        for (const key of extra) console.error(`  + extra:   ${key}`);
    }
}

if (drifted) {
    console.error(`\nEvery locale must carry the same keys as ${REFERENCE}.json.\n`);
    process.exit(1);
}

console.log(`✓ ${locales.length} locales in sync (${reference.size} keys): ${locales.join(', ')}`);
