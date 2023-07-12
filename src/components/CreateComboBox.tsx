import { useState } from "react";
import ComboBoxElement from "./ComboBoxElement";
import Arrow from "./Arrow";

interface CreateComboBoxProps {
  icon: JSX.Element;
  pholder: string;
}

function CreateComboBox({ icon, pholder }: CreateComboBoxProps) {
  const [clicked, setClicked] = useState(false);
  const handleCopyPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className="group relative flex items-center justify-start">
      <div className="flex flex-col">
        <div className="flex items-center justify-start">
          <span className="pointer-events-none absolute left-[14px] mb-[12px] fill-[#228187] 480:mb-[16px]">
            {icon}
          </span>
          <div
            className="disabled mb-[12px] flex h-[52px] w-[310px] select-none appearance-none flex-col justify-center rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[60px] pr-[50px] text-[20px] text-[#1D1B25] shadow-md placeholder:text-[#C4C4C4] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent dark:border-[#228187] dark:bg-[#19201F] dark:text-[#FBF9FA] 480:mb-[16px] 480:h-[58px] 480:w-[342px] 480:text-[22px]"
            onCopy={handleCopyPaste}
            onPaste={handleCopyPaste}
            onClick={handleClick}
          >
            {pholder}
          </div>
          <span
            className={`pointer-events-none absolute right-[14px] mb-[12px] fill-[#228187] transition-all duration-300 480:mb-[16px] ${
              clicked ? "rotate-180" : ""
            }`}
          >
            <Arrow />
          </span>
        </div>
        {pholder === "Presupuesto" && clicked && (
          <div className="relative mb-[12px] flex h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px]">
            <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] bg-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
              <ComboBoxElement name="Presupuesto" text="Bajo" />
              <ComboBoxElement name="Presupuesto" text="Medio" />
              <ComboBoxElement name="Presupuesto" text="Alto" />
            </div>
          </div>
        )}
        {pholder === "Estilo" && clicked && (
          <div className="relative mb-[12px] flex h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px]">
            <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] bg-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
              <ComboBoxElement name="Estilo" text="Moderno" />
              <ComboBoxElement name="Estilo" text="Minimalista" />
              <ComboBoxElement name="Estilo" text="Oriental" />
              <ComboBoxElement name="Estilo" text="Tradicional" />
              <ComboBoxElement name="Estilo" text="Clásico" />
            </div>
          </div>
        )}
        {pholder === "Tipo" && clicked && (
          <div className="relative mb-[12px] flex h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px]">
            <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] bg-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
              <ComboBoxElement name="Tipo" text="Cocina" />
              <ComboBoxElement name="Tipo" text="Living" />
              <ComboBoxElement name="Tipo" text="Dormitorio" />
              <ComboBoxElement name="Tipo" text="Baño" />
            </div>
          </div>
        )}
        {pholder === "Clima" && clicked && (
          <div className="relative mb-[12px] flex h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px]">
            <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] bg-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
              <ComboBoxElement name="Clima" text="Tropical" />
              <ComboBoxElement name="Clima" text="Frío" />
              <ComboBoxElement name="Clima" text="Caluroso" />
              <ComboBoxElement name="Clima" text="Templado" />
            </div>
          </div>
        )}
        {pholder === "Discapacidad" && clicked && (
          <div className="relative mb-[12px] flex h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px]">
            <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] bg-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
              <ComboBoxElement name="Discapacidad" text="Ninguna" />
              <ComboBoxElement name="Discapacidad" text="Paraplejía" />
              <ComboBoxElement name="Discapacidad" text="Ceguera" />
              <ComboBoxElement name="Discapacidad" text="Sordera" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateComboBox;
