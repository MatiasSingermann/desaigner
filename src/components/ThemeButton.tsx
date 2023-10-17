import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Sun from "./Sun";
import Moon from "./Moon";
import PC from "./PC";
import { motion } from "framer-motion";

const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 0.4 },
  variants: {
    visible: { opacity: 1, scale: 1, translateY: 0 },
    hidden: { opacity: 0, scale: 1, translateY: 22 },
  },
};

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  };

  return (
    <>
      <motion.button
        {...motionProps}
        onClick={toggleTheme}
        className={`my-[48px] flex h-[130px] w-[276px] flex-col items-center justify-between rounded-2xl pb-[18px] pt-[16px] font-coolveticaRegular text-[25px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111] ${
          theme === "light"
            ? "bg-[#59C3C3]"
            : theme === "dark"
            ? "bg-[#009E95]"
            : "bg-[#BABABA]"
        }`}
      >
        {theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <PC />}
        {theme === "light"
          ? "Modo claro"
          : theme === "dark"
          ? "Modo oscuro"
          : "Preferencias del sistema"}
      </motion.button>
    </>
  );
}

export default ThemeButton;
