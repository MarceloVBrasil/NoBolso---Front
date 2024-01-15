/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif']
      },
      screens: {
        xxs: '400px',
        xs: '500px',
        ms: '600px',
        sm: '780px',
        lg: '1060px'
      },
      colors: {
        primaria: '#25BD4B',
        secundaria: '#186F2E',
      }
    },
  },
  plugins: [],
}