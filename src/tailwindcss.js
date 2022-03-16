const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './docs/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: () => ({
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
