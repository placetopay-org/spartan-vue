const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./docs/**/*.{vue,js,ts,jsx,tsx}",
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
          200: "#FFE3BC",
          300: "#FFE3BC",
          400: "#FF9440",
          500: "#FF7E29",
          600: "#FF6C0C",
          700: "#DA5A0D",
          800: "#C03D11",
          900: "#A13815",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
