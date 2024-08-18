/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        F5E9E0: "#F5E9E0",
        "1F3D75": "#1F3D75",
        B4ABCE: "#B4ABCE",
      },
      textColor: {
        "1F3D75": "#1F3D75",
        F5E9E0: "#F5E9E0",
        B4ABCE: "#B4ABCE",
      },
    },
  },
  plugins: [],
};
