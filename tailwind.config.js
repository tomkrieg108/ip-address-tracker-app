/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens : {
      sm: '375px',  //mobile
      md: '768px',
      lg: '1020px',
      xl: '1440px', //desktop
    },
    extend: {
      colors: {
        VeryDarkGray: 'hsl(0, 0%, 17%)',
        DarkGray: 'hsl(0, 0%, 59%)',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      spacing: {
        128: "40rem",
      },
    },
  },
  plugins: [],
}

