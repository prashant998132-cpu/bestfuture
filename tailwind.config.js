/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // JARVIS Pink Theme
        jarvis: {
          50:  '#fff0f8',
          100: '#ffe0f0',
          200: '#ffc0e0',
          300: '#ff90c8',
          400: '#ff50a8',
          500: '#ff1a88', // Main JARVIS pink
          600: '#e8006e',
          700: '#c40058',
          800: '#9c0048',
          900: '#7a003a',
        },
        // Dark Background
        dark: {
          50:  '#f0f0f8',
          100: '#e0e0f0',
          200: '#c0c0d8',
          300: '#9090b8',
          400: '#606090',
          500: '#404068',
          600: '#2a2a50',
          700: '#1a1a3c',
          800: '#10102a',
          900: '#080818', // Deepest dark
          950: '#04040e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'jarvis-gradient': 'linear-gradient(135deg, #ff1a88 0%, #8b00ff 100%)',
        'dark-gradient': 'linear-gradient(180deg, #080818 0%, #10102a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,26,136,0.1) 0%, rgba(139,0,255,0.1) 100%)',
      },
      boxShadow: {
        'jarvis': '0 0 20px rgba(255, 26, 136, 0.3)',
        'jarvis-lg': '0 0 40px rgba(255, 26, 136, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-pink': 'pulse-pink 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-pink': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 26, 136, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 26, 136, 0.6)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'typing': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
