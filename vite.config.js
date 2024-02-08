import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            defaultSFCLang: 'json',
            include: [resolve(__dirname, './src/locales/**')],
        }),
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
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SpartanVue',
        },
        rollupOptions: {
            external: [
                'vue',
                'vue-i18n',
                // '@floating-ui/vue',
                // '@headlessui/vue',
                // '@heroicons/vue',
                // '@intlify/unplugin-vue-i18n',
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
                    // '@intlify/unplugin-vue-i18n': 'VueI18nPlugin',
                    // '@tanstack/vue-table': 'VueTable',
                    // '@vuepic/vue-datepicker': 'VueDatepickerTW3',
                    // 'vue-currency-input': 'VueCurrencyInput',
                    // 'vue-imask': 'VueIMask',
                },
            },
        },
    },
});
