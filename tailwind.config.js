/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'header-text': ['Anek Malayalam', 'sans-serif'],
    },
    extend: {
      colors: {
        'reg-color': '#4aa8fb',
        body: '#e5e7eb',
      },
      boxShadow: {
        header: '0px 0px 20px black;',
      },
    },
  },
  plugins: [],
};
