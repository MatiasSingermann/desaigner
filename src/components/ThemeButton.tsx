import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <button onClick={toggleTheme}>Theme {theme}</button>
    </>
  );
}

export default ThemeButton;
