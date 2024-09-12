/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#19216C",
          90: "#2D3A8C",
          80: "#35469C",
          70: "#4055A8",
          60: "#4C63B6",
        },
        secondary: {
          100: "#F9703E",
          90: "#FF9466",
          80: "#FFB088",
          70: "#FFD0B5",
          60: "#FFE8D9",
        },
      },
    },
  },
  plugins: [],
};
