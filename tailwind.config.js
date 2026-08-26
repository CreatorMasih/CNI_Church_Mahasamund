/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F6F1E7',
          cream: '#FFFDF8',
          dark: '#EBE4D5',
        },
        burgundy: {
          DEFAULT: '#7E2634',
          dark: '#4E1822',
          soft: '#A13A4A',
          glow: 'rgba(126, 38, 52, 0.15)',
        },
        gold: {
          DEFAULT: '#B8944A',
          soft: '#D8BC76',
          dark: '#8C6E2E',
          glow: 'rgba(184, 148, 74, 0.2)',
        },
        charcoal: {
          DEFAULT: '#17202B',
          light: '#232E3C',
          card: '#1D2733',
        },
        muted: {
          DEFAULT: '#6E6A63',
          dark: '#4A4742',
          light: '#9E9A91',
        },
        warm: {
          white: '#FFFDF9',
          card: '#FAF6EE',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Jost"', '"Inter"', '"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
