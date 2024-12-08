/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B7C85',
        'tuffy-pink': {
          DEFAULT: '#FF66C4',
          light: '#fff5f8',
          dark: '#ff4db8'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
};