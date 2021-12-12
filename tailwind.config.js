module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#F2F2F2',
        gray: {
          100: '#BFBFBF',
          200: '#797979',
          // ...
          900: '#212121',
        },
        pink: {
          700: '#C40772',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
