const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');
const path = require('path');

const withOpacityValue = (variable) => ({ opacityValue }) => {
  if (!opacityValue) return `rgb(var(${variable}))`;
  return `rgb(var(${variable}) / ${opacityValue})`;
};

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./docs/**/*.{vue,js,ts,jsx,tsx}",
    path.resolve(__dirname, '../node_modules/litepie-datepicker-tw3/**/*.js'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: withOpacityValue("--color-primary-50"), // 255 246 234
          100: withOpacityValue("--color-primary-100"), // 255 227 188
          200: withOpacityValue("--color-primary-200"), // 255 204 141
          300: withOpacityValue("--color-primary-300"), // 255 179 98
          400: withOpacityValue("--color-primary-400"), // 255 148 64
          500: withOpacityValue("--color-primary-500"), // 255 126 41
          600: withOpacityValue("--color-primary-600"), // 255 108 12
          700: withOpacityValue("--color-primary-700"), // 218 90 13
          800: withOpacityValue("--color-primary-800"), // 192 61 17
          900: withOpacityValue("--color-primary-900"), // 161 56 21
        },
        'litepie-primary': {
          50: "#FFF6EA",
          100: "#FFE3BC",
          200: "#FFCC8D",
          300: "#FFB362",
          400: "#FF9440",
          500: "#FF7E29",
          600: "#FF6C0C",
          700: "#DA5A0D",
          800: "#C03D11",
          900: "#A13815",
        },
        'litepie-secondary': colors.slate,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
