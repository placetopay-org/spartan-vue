/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import tailwindForms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';

const withOpacityValue =
  (variable) =>
  ({ opacityValue }) => {
    if (!opacityValue) return `rgb(var(${variable}))`;
    return `rgb(var(${variable}) / ${opacityValue})`;
  };

export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: withOpacityValue('--color-primary-50'), // 255 246 234
          100: withOpacityValue('--color-primary-100'), // 255 227 188
          200: withOpacityValue('--color-primary-200'), // 255 204 141
          300: withOpacityValue('--color-primary-300'), // 255 179 98
          400: withOpacityValue('--color-primary-400'), // 255 148 64
          500: withOpacityValue('--color-primary-500'), // 255 126 41
          600: withOpacityValue('--color-primary-600'), // 255 108 12
          700: withOpacityValue('--color-primary-700'), // 218 90 13
          800: withOpacityValue('--color-primary-800'), // 192 61 17
          900: withOpacityValue('--color-primary-900'), // 161 56 21
        },
        'litepie-primary': {
          50: '#FFF6EA',
          100: '#FFE3BC',
          200: '#FFCC8D',
          300: '#FFB362',
          400: '#FF9440',
          500: '#FF7E29',
          600: '#FF6C0C',
          700: '#DA5A0D',
          800: '#C03D11',
          900: '#A13815',
        },
        'litepie-secondary': colors.slate,
      },
    },
  },
  plugins: [
    tailwindForms,
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        ":root": {
          "--color-primary-50": "255 246 234",
          "--color-primary-100": "255 227 188",
          "--color-primary-200": "255 204 141",
          "--color-primary-300": "255 179 98",
          "--color-primary-400": "255 148 64",
          "--color-primary-500": "255 126 41",
          "--color-primary-600": "255 108 12",
          "--color-primary-700": "218 90 13",
          "--color-primary-800": "192 61 17",
          "--color-primary-900": "161 56 21"
        },
        'html': {
          "@apply antialiased": {},
        },
        "@import url('https://rsms.me/inter/inter.css')": true
      })
      addUtilities({
        '.s-focus': {
          "@apply duration-150 focus:ring focus:ring-primary-100 focus:border-primary-300": {},
        },
        '.s-focus-within': {
          "@apply duration-150 focus-within:ring focus-within:ring-primary-100 focus-within:border-primary-300": {},
        }
      })
    })
  ],
};
