/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ebf4',
          200: '#c2d7e9',
          300: '#94badd',
          400: '#5e96cd',
          500: '#3876bd',
          600: '#285da3',
          700: '#214b84',
          800: '#1d406e',
          900: '#0B1F3A',
          950: '#06101E',
        },
        teal: {
          50: '#effbf8',
          100: '#cbf6eb',
          200: '#98ecda',
          300: '#5ddcc4',
          400: '#26d3bc',
          500: '#00C2A8',
          600: '#00a892',
          700: '#008c79',
          800: '#056b5d',
          900: '#08574c',
          950: '#02332e',
        },
        slate: {
          850: '#151f32',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
