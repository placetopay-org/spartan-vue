import { rimraf } from 'rimraf';
import fs from 'fs';

const sanitizeTypesFolder = async () => {
    console.log('cleaning types folder...');

    fs.renameSync('./dist/locales/index.ts', './dist/locales/index.js');

    const components = fs.readdirSync('./dist/components');

    components.forEach((component) => {
        fs.cpSync(`./dist/types/components/spartan/${component}/${component}.vue.d.ts`, `./dist/components/${component}/index.d.ts`);
        if (fs.existsSync(`./dist/types/components/spartan/${component}/types.d.ts`)) fs.cpSync(`./dist/types/components/spartan/${component}/types.d.ts`, `./dist/components/${component}/types.d.ts`);
    });

    await rimraf('./dist/types/stories');
    await rimraf('./dist/types/data');
    await rimraf('./dist/types/helpers');
    await rimraf('./dist/types/hooks');
    await rimraf('./dist/types/constants');
    await rimraf('./dist/types/vitest-setup.d.ts');
    await rimraf('./dist/types/components');

    fs.writeFileSync(
        './dist/types/index.d.ts',
        `export * from './expose';
export * from './locales';
`,
    );

    console.log('types folder cleaned');
};

(async () => {
    await sanitizeTypesFolder();

    // generate index for components folder
})();
