/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js, ts, tsx, jsx}', './src/**/*'],
  theme: {
    extend: {
      scale: {
        0: '0',
        100: '1',
        120: '1.2',
      },
      animation: {
        'fire-animation': 'fire-animation 2s ease-in-out infinite',
      },
      keyframes: {
        'fire-animation': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
