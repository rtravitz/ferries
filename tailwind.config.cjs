module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'ferry-green': "url('/src/assets/ferry-good.svg')",
        'ferry-yellow': "url('/src/assets/ferry-delayed.svg')",
        'ferry-red': "url('/src/assets/ferry-out-of-service.svg')",
      }),
      colors: {
        gray: {
          'transparent-200': 'rgba(229, 231, 235, 0.9)',
          'transparent-300': 'rgba(209, 213, 219, 0.9)',
          'transparent-600': 'rgba(75, 85, 99, 0.4)',
        },
        slate: {
          'transparent-100': 'rgba(241, 245, 249, 0.9)',
        },
        blue: {
          secondary: '#44A5DE',
          dock: '#3B82F6',
          'transparent-200': 'rgba(191, 219, 254, 0.9)',
        },
        green: {
          dark: '#384B42',
          light: '#9AB0A6',
          brand: '#047857',
        },
      },
      animation: {
        'spin-once': 'spin 1s',
      },
    },
  },
  plugins: [],
};
