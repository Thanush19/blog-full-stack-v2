/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        r: "#ce2d0d",
        y: "#f0b214",
        p: "#f2c6a5",
        w: "#ffffff",
        b: "#000000",
      },
    },
  },
  plugins: [],
};
