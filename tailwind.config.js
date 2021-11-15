module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: "#384aeb",
        light: "#F1F6F7"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
