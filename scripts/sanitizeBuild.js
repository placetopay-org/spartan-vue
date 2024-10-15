import { rimraf } from 'rimraf';
import fs from 'fs';

const sanitizeTypesFolder = async () => {
    console.log('cleaning types folder...');

    await rimraf('./dist/types/stories');
    await rimraf('./dist/types/data');
    await rimraf('./dist/types/helpers');
    await rimraf('./dist/types/hooks');
    await rimraf('./dist/types/constants');
    await rimraf('./dist/types/components/internal');
    await rimraf('./dist/types/vitest-setup.d.ts');

    fs.renameSync('./dist/locales/index.ts', './dist/locales/index.js');

    fs.cpSync('./dist/types/components/spartan', './dist/types/components', { recursive: true });
    fs.cpSync('./dist/types/components/index.d.ts', './dist/components/index.js', { recursive: true });

    fs.writeFileSync(
        './dist/types/index.d.ts',
        `export * from './expose';
export * from './components';
export * from './locales';
`,
    );

    console.log('types folder cleaned');
};

(async () => {
    await sanitizeTypesFolder();

    // generate index for components folder
})();
