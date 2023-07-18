/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        ubuntu: "'Ubuntu', sans-serif"
      }
    },
  },
  plugins: [
            require('@tailwindcss/aspect-ratio'),
            require('tailwind-scrollbar-hide'),
            ],
}

