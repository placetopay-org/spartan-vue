/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './docs/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: 'rgb(var(--color-primary-50) / <alpha-value>)', // 255 246 234
                    100: 'rgb(var(--color-primary-100) / <alpha-value>)', // 255 227 188
                    200: 'rgb(var(--color-primary-200) / <alpha-value>)', // 255 204 141
                    300: 'rgb(var(--color-primary-300) / <alpha-value>)', // 255 179 98
                    400: 'rgb(var(--color-primary-400) / <alpha-value>)', // 255 148 64
                    500: 'rgb(var(--color-primary-500) / <alpha-value>)', // 255 126 41
                    600: 'rgb(var(--color-primary-600) / <alpha-value>)', // 255 108 12
                    700: 'rgb(var(--color-primary-700) / <alpha-value>)', // 218 90 13
                    800: 'rgb(var(--color-primary-800) / <alpha-value>)', // 192 61 17
                    900: 'rgb(var(--color-primary-900) / <alpha-value>)', // 161 56 21
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
