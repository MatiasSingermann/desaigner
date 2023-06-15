import { boolean } from "zod";
import EyeClosed from "./EyeClosed";
import EyeOpen from "./EyeOpen";
import { MouseEventHandler } from "react";

interface ShowButtonProps {
  showPassword: boolean;
  togglePassword: MouseEventHandler<HTMLButtonElement>;
}

function ShowButton({ showPassword, togglePassword }: ShowButtonProps) {
  return (
    <button
      className={
        "absolute right-0 mb-[12px] flex h-[52px] items-center justify-center fill-[#C4C4C4] pr-3 dark:fill-[#228187]"
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
