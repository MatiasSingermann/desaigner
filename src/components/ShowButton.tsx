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
    <button className={"flex justify-center items-center absolute mb-[12px] pr-3 right-0 h-[52px] fill-[#C4C4C4] dark:fill-[#228187]"} aria-label={`${showPassword ? "Contraseña visible" : "Contraseña invisible"}`} onClick={togglePassword}>
      {showPassword ? <EyeOpen /> : <EyeClosed />}
    </button>
  );
}

export default ShowButton;
