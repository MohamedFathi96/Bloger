/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#0f172a",
        "secondary-dark-bg": "#33373E",
        "accent-yellow": "#fff37a",
        "accent-gray": "#dcdcdc",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
