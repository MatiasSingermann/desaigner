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
        opendyslexicRegular: "opendyslexic-regular, sans-serif",
        opendyslexicBold: "opendyslexic-bold, sans-serif",
      }
    },
    screens: {
      360: "640px",
      480: "854px",
      720: "1280px",
      1080: "1920px",
      1440: "2560px",
    },
  },
  plugins: [],
} satisfies Config;
