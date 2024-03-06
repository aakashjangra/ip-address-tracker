/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "v-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      backgroundImage: {
        "desktop-pattern": "url('/pattern-bg-desktop.png')",
        "mobile-pattern": "url('/pattern-bg-mobile.png')",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
