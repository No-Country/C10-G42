/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#3232ac',
        secondary: '#47c1b5',
      },
    },
  },
  plugins: [],
};
