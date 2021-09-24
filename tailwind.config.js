module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    transform: true,
  },
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
        blue: {
          'secondary': '#44A5DE',
        },
        green: {
          'dark': '#384B42',
          'light': '#9AB0A6',
        }
      },
      animation: {
        'spin-once': 'spin 1s',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
}
