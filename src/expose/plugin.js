import plugin from 'tailwindcss/plugin';
import tailwindForms from '@tailwindcss/forms';

export default plugin.withOptions(
    function (options = {}) {
        return function (config) {
            tailwindForms().handler(config);

            const colors = options.primary ?? {
                50: '255 246 234',
                100: '255 227 188',
                200: '255 204 141',
                300: '255 179 98',
                400: '255 148 64',
                500: '255 126 41',
                600: '255 108 12',
                700: '218 90 13',
                800: '192 61 17',
                900: '161 56 21',
            };

            const colorUtilities = Object.entries(colors).reduce((acc, [key, value]) => {
                acc[`--color-spartan-primary-${key}`] = value;
                return acc;
            }, {});

            config.addUtilities({
                ':root': colorUtilities,
                html: { '@apply antialiased': {} },
                // "@import '@placetopay/spartan-vue/style.css';": true, NOT WORKS
                // "@import url('https://rsms.me/inter/inter.css')": true, NOT WORKS
                '.s-ring': {
                    '@apply duration-150 ring ring-spartan-primary-100 border-spartan-primary-300 z-10': {},
                },
                '.s-ring-secondary': {
                    '@apply duration-150 ring ring-gray-100 border-gray-300 z-10': {},
                },
                '.s-ring-error': {
                    '@apply duration-150 ring ring-red-200 border-red-500 z-10': {},
                },
            });
        };
    },
    function (options) {
        return {
            theme: {
                extend: {
                    colors: {
                        'spartan-primary': {
                            50: 'rgb(var(--color-spartan-primary-50) / <alpha-value>)', // 255 246 234
                            100: 'rgb(var(--color-spartan-primary-100) / <alpha-value>)', // 255 227 188
                            200: 'rgb(var(--color-spartan-primary-200) / <alpha-value>)', // 255 204 141
                            300: 'rgb(var(--color-spartan-primary-300) / <alpha-value>)', // 255 179 98
                            400: 'rgb(var(--color-spartan-primary-400) / <alpha-value>)', // 255 148 64
                            500: 'rgb(var(--color-spartan-primary-500) / <alpha-value>)', // 255 126 41
                            600: 'rgb(var(--color-spartan-primary-600) / <alpha-value>)', // 255 108 12
                            700: 'rgb(var(--color-spartan-primary-700) / <alpha-value>)', // 218 90 13
                            800: 'rgb(var(--color-spartan-primary-800) / <alpha-value>)', // 192 61 17
                            900: 'rgb(var(--color-spartan-primary-900) / <alpha-value>)', // 161 56 21
                        },
                    },
                },
            },
            safelist: ['sm:items-start', 'sm:items-center', 'sm:items-end'],
        };
    },
);
