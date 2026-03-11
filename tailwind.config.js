/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['"Cairo"', 'sans-serif'], // إضافة خط Cairo
      },
      colors: {
        color_1: '#9CCC3C',
        color_2: '#04643C',
        color_3: '#FFCD1E',
      },
      boxShadow: {
        green: '0px 8px 20px 0px rgba(95, 162, 134, 0.50)',
      },
    },
  },
  plugins: [],
};