/** @type {import('tailwindcss').Config} */
import { resolve } from 'path';
import tailwindPreset from './src/expose/tailwindcss';

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './docs/**/*.{vue,js,ts,jsx,tsx}',
        resolve(__dirname, '../node_modules/litepie-datepicker-tw3/**/*.js'),
    ],
    presets: [tailwindPreset],
    variants: {
        extend: {},
    },
    plugins: [],
};
