/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
      colors: {
        navy: {
          50:  '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d8fe',
          300: '#a4bffc',
          400: '#7a9df5',
          500: '#4f7ae8',
          600: '#2e5dcf',
          700: '#1e4aaa',
          800: '#163a85',
          900: '#0f2e6b',
          950: '#0a1f4e',
          DEFAULT: '#0f3460',
        },
        gold: {
          100: '#fef9e7',
          200: '#fdefc0',
          300: '#fbd978',
          400: '#f7c23a',
          500: '#c9a227',
          600: '#a07c1a',
          DEFAULT: '#c9a227',
        },
        cream: {
          50:  '#fdfcf8',
          100: '#faf7f0',
          200: '#f5efe0',
        },
      },
      boxShadow: {
        'glow-navy':   '0 0 40px rgba(15, 52, 96, 0.2)',
        'glow-gold':   '0 0 30px rgba(201, 162, 39, 0.25)',
        'glow-emerald':'0 0 40px rgba(5, 150, 105, 0.3)',
        'card':        '0 2px 16px rgba(15,52,96,0.08)',
        'card-hover':  '0 12px 40px rgba(15,52,96,0.16)',
        'card-gold':   '0 4px 24px rgba(201,162,39,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
