module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    transform: true,
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
        'ferry-green': "url('/src/assets/ferry-good.svg')",
        'ferry-yellow': "url('/src/assets/ferry-delayed.svg')",
        'ferry-red': "url('/src/assets/ferry-out-of-service.svg')",
      }),
      colors: {
        gray: {
          'transparent-200': 'rgba(229, 231, 235, 0.9)',
          'transparent-300': 'rgba(209, 213, 219, 0.9)',
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
  plugins: []
}
