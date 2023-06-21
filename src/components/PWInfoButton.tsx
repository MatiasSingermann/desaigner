import PasswordInfo from "./PasswordInfo";
import { MouseEventHandler } from "react";

interface PWInfoButtonProps {
  showReqs: boolean;
  toggleReqs: MouseEventHandler<HTMLButtonElement>;
}

function PWInfoButton({showReqs, toggleReqs} : PWInfoButtonProps) {
  return (
    <button
      className="absolute right-0 mb-[12px] flex h-[52px] items-center justify-center fill-[#C4C4C4] pr-[54px] dark:fill-[#228187]"
      aria-label={showReqs ? "Ocultar requisitos de contraseña" : "Mostrar requisitos de contraseña"}
      onClick={toggleReqs}
    >
      <PasswordInfo />
    </button>
  );
}

export default PWInfoButton;
