/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF8',
          100: '#CCFBF1',
          200: '#99F6E4',
          500: '#14B8A6',
          600: '#0F6E56', // Primary Deep Teal
          700: '#0D5B47',
          800: '#0A4838',
          900: '#063227',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#BA7517', // Warm Amber
          700: '#92400E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};
