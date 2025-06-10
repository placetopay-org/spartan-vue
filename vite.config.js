/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { componentsEntryMap } from './scripts/components';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
    ],
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
            external: [
                'vue',
                'vue-i18n',
                // '@floating-ui/vue',
                // '@headlessui/vue',
                // '@heroicons/vue',
                // '@tanstack/vue-table',
                //'@vuepic/vue-datepicker',  TODO: Review this package
                // 'lodash',  TODO: Review this package and use tree-shaking
                // 'vue-currency-input',
                // 'vue-imask',
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    'vue-i18n': 'VueI18n',
                    // '@floating-ui/vue': 'FloatingUI',
                    // '@headlessui/vue': 'HeadlessUI',
                    // '@heroicons/vue': 'Heroicons',
                    // '@tanstack/vue-table': 'VueTable',
                    // '@vuepic/vue-datepicker': 'VueDatepickerTW3',
                    // 'vue-currency-input': 'VueCurrencyInput',
                    // 'vue-imask': 'VueIMask',
                },
                entryFileNames: 'components/[name]/index.js',
                chunkFileNames: 'shared/[name].js',
            },
        },
    },
    test: {
        globals: true,
        include: ['./src/components/spartan/**/*.test.ts'],
        setupFiles: './src/vitest-setup.ts',
        environment: 'jsdom',
        coverage: {
            reporter: ['lcov', 'html'],
            provider: 'istanbul',
            extension: ['.vue'],
            include: ['src/components/spartan/'],
            clean: false,
        },
    },
});
