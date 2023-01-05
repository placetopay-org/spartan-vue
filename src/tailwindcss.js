const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');
const path = require('path');

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
