import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coolvetica: [`var(--font-coolvetica)`, "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
