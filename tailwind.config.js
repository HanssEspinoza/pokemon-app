/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#185A7D",
        secondary: "#00693C",
        "custom-shadow": "#78B1B51A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
