import EyeClosed from "./EyeClosed";
import EyeOpen from "./EyeOpen";
import type { MouseEventHandler } from "react";

interface ShowButtonProps {
  showPassword: boolean;
  togglePassword: MouseEventHandler<HTMLButtonElement>;
}

function ShowButton({ showPassword, togglePassword }: ShowButtonProps) {
  return (
    <button
      className={
        "flex h-[52px] items-center justify-center fill-[#C4C4C4] dark:fill-[#228187]"
      }
      aria-label={`${
        showPassword ? "Contraseña visible" : "Contraseña invisible"
      }`}
      onClick={togglePassword}
    >
      {showPassword ? <EyeOpen /> : <EyeClosed />}
    </button>
  );
}

export default ShowButton;
