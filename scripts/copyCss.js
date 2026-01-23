import fs from 'fs';

(async () => {
    console.log('copying CSS files...');

    // Ensure dist/styles directory exists
    const distStylesDir = './dist/styles';
    if (!fs.existsSync(distStylesDir)) {
        fs.mkdirSync(distStylesDir, { recursive: true });
    }

    // Copy CSS files from src/styles to dist/styles
    const cssFiles = ['main.css', 'fonts.css', 'plugin.css'];
    cssFiles.forEach((file) => {
        const srcPath = `./src/styles/${file}`;
        const destPath = `./dist/styles/${file}`;

        if (fs.existsSync(srcPath)) {
            fs.cpSync(srcPath, destPath);
            console.log(`  ✓ copied ${file}`);
        } else {
            console.warn(`  ⚠ ${file} not found, skipping`);
        }
    });

    // Move spartan-vue.css to dist/styles/
    if (fs.existsSync('./dist/spartan-vue.css')) {
        fs.renameSync('./dist/spartan-vue.css', './dist/styles/spartan-vue.css');
        console.log('  ✓ moved spartan-vue.css to styles/');
    }

    // Create dist/styles.css that imports main.css and spartan-vue.css
    const stylesCssContent = `@import './styles/main.css';
@import './styles/spartan-vue.css';
`;

    fs.writeFileSync('./dist/styles.css', stylesCssContent);
    console.log('  ✓ created styles.css');

    console.log('CSS files copied successfully');
})();
