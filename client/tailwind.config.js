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
    },
  },
  plugins: [],
};
