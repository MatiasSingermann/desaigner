import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        coolveticaLight: "coolvetica-light, sans-serif",
        coolveticaRegular: "coolvetica-regular, sans-serif",
        coolveticaBook: "coolvetica-book, sans-serif",
      }
    },
  },
  plugins: [],
} satisfies Config;
