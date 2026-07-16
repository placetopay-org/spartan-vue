/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { componentsEntryMap } from './scripts/components';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), svgLoader(), tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@spartan': resolve(__dirname, './src/components/spartan'),
            '@internal': resolve(__dirname, './src/components/internal'),
        },
    },
    build: {
        outDir: './dist',
        lib: { entry: componentsEntryMap, formats: ['es'] },
        name: 'SpartanVue',
        rollupOptions: {
            // Only vue and vue-i18n are externalized (peer dependencies);
            // every other runtime library is bundled into the package.
            external: ['vue', 'vue-i18n'],
            output: {
                globals: {
                    vue: 'Vue',
                    'vue-i18n': 'VueI18n',
                },
                entryFileNames: 'components/[name]/index.js',
                chunkFileNames: 'shared/[name].js',
            },
        },
    },
    test: {
        globals: true,
        include: ['./src/**/*.test.ts'],
        setupFiles: './src/vitest-setup.ts',
        environment: 'jsdom',
        coverage: {
            // `json-summary` feeds `scripts/checkComponentStatus.js`, which asserts that
            // the `tests` field of each entry in componentStatus.ts is the measured
            // coverage rather than a number somebody typed.
            reporter: ['lcov', 'html', 'json-summary'],
            provider: 'istanbul',
            extension: ['.vue'],
            include: ['src/components/spartan/'],
            clean: false,
            // The library advertises 100% coverage; make the guarantee
            // enforceable locally instead of relying only on SonarQube.
            thresholds: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100,
            },
        },
    },
});
