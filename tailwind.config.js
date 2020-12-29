module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'ferry': "url('/src/assets/ferry-good.svg')"
      }),
      colors: {
        gray: {
          'transparent-200': 'rgba(229, 231, 235, 0.9)',
          'transparent-300': 'rgba(209, 213, 219, 0.9)',
        },
        green: {
          ferry: '#017359',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
