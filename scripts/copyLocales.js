import fs from 'fs';

// Cross-platform replacement for `cp -r src/locales dist/locales` — the rest
// of the pipeline is Node scripts, and `cp` breaks on Windows contributors.
console.log('copying locales...');

if (!fs.existsSync('./src/locales')) {
    console.error('  ✗ src/locales not found');
    process.exit(1);
}

fs.cpSync('./src/locales', './dist/locales', { recursive: true });
console.log('locales copied successfully');
