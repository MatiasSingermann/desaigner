import { ChangeEvent, useState } from "react";
import ComboBoxElement from "./ComboBoxElement";
import Arrow from "./Arrow";

interface CreateComboBoxProps {
  icon: JSX.Element;
  pholder: string;
}

function CreateComboBox({ icon, pholder }: CreateComboBoxProps) {
  const [clicked, setClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setClicked(false);
  };
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
            className={`disabled mb-[12px] flex h-[52px] w-[310px] select-none appearance-none flex-col justify-center rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[60px] pr-[50px] text-[20px] shadow-md placeholder:text-[#C4C4C4] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent dark:border-[#228187] dark:bg-[#19201F] 480:mb-[16px] 480:h-[58px] 480:w-[342px] 480:text-[22px] ${
              selectedOption != ""
                ? "text-[#1D1B25] dark:text-[#FBF9FA]"
                : "text-[#C4C4C4] dark:text-[#BABABA]"
            }`}
            onCopy={handleCopyPaste}
            onPaste={handleCopyPaste}
            onClick={handleClick}
          >
            {selectedOption != "" ? selectedOption : pholder}
          </div>
          <span
            className={`pointer-events-none absolute right-[14px] mb-[12px] fill-[#228187] transition-all duration-300 480:mb-[16px] ${
              clicked ? "-rotate-180" : ""
            }`}
          >
            <Arrow />
          </span>
        </div>
        <div
          className={`relative mb-[12px] h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px] ${
            pholder === "Presupuesto" && clicked ? "flex" : "hidden"
          }`}
        >
          <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] border-[2px] border-[#E8E8E8] bg-[#FBF9FA] dark:border-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
            <ComboBoxElement
              name="Presupuesto"
              text="Bajo"
              value="Bajo"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Presupuesto"
              text="Medio"
              value="Medio"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Presupuesto"
              text="Alto"
              value="Alto"
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
        <div
          className={`relative mb-[12px] h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px] ${
            pholder === "Estilo" && clicked ? "flex" : "hidden"
          }`}
        >
          <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] border-[2px] border-[#E8E8E8] bg-[#FBF9FA] dark:border-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
            <ComboBoxElement
              name="Estilo"
              text="Moderno"
              value="Moderno"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Estilo"
              text="Minimalista"
              value="Minimalista"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Estilo"
              text="Oriental"
              value="Oriental"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Estilo"
              text="Tradicional"
              value="Tradicional"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Estilo"
              text="Clásico"
              value="Clásico"
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
        <div
          className={`relative mb-[12px] h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px] ${
            pholder === "Tipo" && clicked ? "flex" : "hidden"
          }`}
        >
          <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] border-[2px] border-[#E8E8E8] bg-[#FBF9FA] dark:border-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
            <ComboBoxElement
              name="Tipo"
              text="Cocina"
              value="Cocina"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Tipo"
              text="Living"
              value="Living"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Tipo"
              text="Dormitorio"
              value="Dormitorio"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Tipo"
              text="Baño"
              value="Baño"
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
        <div
          className={`relative mb-[12px] h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px] ${
            pholder === "Clima" && clicked ? "flex" : "hidden"
          }`}
        >
          <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] border-[2px] border-[#E8E8E8] bg-[#FBF9FA] dark:border-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
            <ComboBoxElement
              name="Clima"
              text="Tropical"
              value="Tropical"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Clima"
              text="Frío"
              value="Frío"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Clima"
              text="Caluroso"
              value="Caluroso"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Clima"
              text="Templado"
              value="Templado"
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
        <div
          className={`relative mb-[12px] h-[156px] w-[310px] overflow-hidden rounded-[1.25rem] 480:mb-[16px] 480:h-[174px] 480:w-[342px] ${
            pholder === "Discapacidad" && clicked ? "flex" : "hidden"
          }`}
        >
          <div className="relative h-[156px] w-[310px] flex-col overflow-x-hidden overflow-y-scroll rounded-[1.25rem] border-[2px] border-[#E8E8E8] bg-[#FBF9FA] dark:border-[#292F2D] dark:bg-[#292F2D] 480:h-[174px] 480:w-[342px]">
            <ComboBoxElement
              name="Discapacidad"
              text="Ninguna"
              value="Ninguna"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Discapacidad"
              text="Paraplejía"
              value="Paraplejía"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Discapacidad"
              text="Ceguera"
              value="Ceguera"
              handleRadioChange={handleRadioChange}
            />
            <ComboBoxElement
              name="Discapacidad"
              text="Sordera"
              value="Sordera"
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComboBox;
