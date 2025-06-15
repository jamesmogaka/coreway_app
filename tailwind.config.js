/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFBDE',
        'teal-light': '#90D1CA',
        'teal-medium': '#129990',
        'teal-dark': '#096B68',
      },
    },
  },
  plugins: [],
}
