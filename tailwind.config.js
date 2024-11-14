/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#FF8C42',
          hover: '#FF7A33',
        },
        secondary: {
          DEFAULT: '#A3DAE8',
          hover: '#8CCFDF',
        },
        premium: {
          DEFAULT: '#D9534F',
          hover: '#C9433F',
        },
        dark: {
          DEFAULT: '#2C2C2C',
          lighter: '#3C3C3C',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};