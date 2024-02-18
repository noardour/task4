/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#61dafb",
        "main-idle": "#343e49",
        error: "#fb6161",
        "error-idle": "#493434",
      },
      boxShadow: {
        blur: "0 0 10px 0",
      },
    },
  },
  plugins: [],
};
