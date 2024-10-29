import { rimraf } from 'rimraf';
import fs from 'fs';

(async () => {
    console.log('cleaning types folder...');

    const components = fs.readdirSync('./dist/components');

    components.forEach((component) => {
        fs.cpSync(`./dist/types/components/spartan/${component}/index.d.ts`, `./dist/components/${component}/index.d.ts`);
        fs.cpSync(`./dist/types/components/spartan/${component}/${component}.vue.d.ts`, `./dist/components/${component}/${component}.vue.d.ts`);
        if (fs.existsSync(`./dist/types/components/spartan/${component}/types.d.ts`)) fs.cpSync(`./dist/types/components/spartan/${component}/types.d.ts`, `./dist/components/${component}/types.d.ts`);
    });
    
    fs.renameSync('./dist/locales/index.ts', './dist/locales/index.js');
    fs.cpSync('./dist/locales/index.js', './dist/locales/index.d.ts');
    
    fs.renameSync('./dist/types/components/spartan/index.d.ts', './dist/components/index.js');
    fs.cpSync('./dist/components/index.js', './dist/components/index.d.ts');

    rimraf('./dist/types');

    console.log('types folder cleaned');
})();
