/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        workshop: {
          50: '#fdf8ef',
          100: '#faefd9',
          200: '#f4dbb2',
          300: '#edc380',
          400: '#e4a44d',
          500: '#dd8d2a',
          600: '#cf7420',
          700: '#ac591c',
          800: '#89471e',
          900: '#6f3b1b',
          950: '#3c1d0b',
        },
        surface: {
          50: '#f6f6f7',
          100: '#e2e3e5',
          200: '#c4c6cb',
          300: '#a0a3aa',
          400: '#7c8089',
          500: '#62656e',
          600: '#4e5058',
          700: '#404248',
          800: '#36373c',
          900: '#1e1f23',
          950: '#131416',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
