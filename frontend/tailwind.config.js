/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cocoa: {
          light: "#D8C4A0",
          medium: "#A57B64",
          dark: "#8B5B50",
        },
        charcoal: {
          light: "#2D2D2D",
          medium: "#1F1F1F",
        },
      },
    },
  },
  plugins: [],
};
