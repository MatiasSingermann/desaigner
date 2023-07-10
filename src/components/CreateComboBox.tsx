import { useState } from "react";
import ComboBoxElement from "./ComboBoxElement";

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
          <span className="pointer-events-none absolute mb-[12px] fill-[#228187] pl-[14px] 480:mb-[16px]">
            {icon}
          </span>
          <div
            className="disabled mb-[12px] flex h-[52px] w-[310px] select-none appearance-none flex-col justify-center rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[60px] pr-[10px] text-[20px] text-[#1D1B25] shadow-md placeholder:text-[#C4C4C4] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent dark:border-[#228187] dark:bg-[#19201F] dark:text-[#FBF9FA] 480:mb-[16px] 480:h-[58px] 480:w-[342px] 480:text-[22px]"
            onCopy={handleCopyPaste}
            onPaste={handleCopyPaste}
            onClick={handleClick}
          >
            {pholder}
          </div>
        </div>
        {pholder === "Presupuesto" && clicked && (
          <div className="relative flex h-[160px] w-[310px] flex-col rounded-[1.25rem] bg-red-500 480:h-[180px] 480:w-[342px] overflow-x-hidden overflow-y-scroll mb-[12px] 480:mb-[16px]">
            <ComboBoxElement name="Presupuesto" text="Bajo"/>
            <ComboBoxElement name="Presupuesto" text="Medio"/>
            <ComboBoxElement name="Presupuesto" text="Alto"/>
            <ComboBoxElement name="Presupuesto" text="No se"/>
          </div>
        )}
        {pholder === "Estilo" && clicked && (
          <>
            <option value="" disabled selected hidden>
              Estilo de ambiente
            </option>
            <option value="moderno">Moderno</option>
            <option value="minimalista">Minimalista</option>
            <option value="oriental">Oriental</option>
            <option value="tradicional">Tradicional</option>
            <option value="clasico">Clásico</option>
          </>
        )}
        {pholder === "Tipo" && clicked && (
          <>
            <option value="" disabled selected hidden>
              Tipo de ambiente
            </option>
            <option value="cocina">Cocina</option>
            <option value="living">Living</option>
            <option value="dormitorio">Dormitorio</option>
            <option value="baño">Baño</option>
          </>
        )}
        {pholder === "Clima" && clicked && (
          <>
            <option value="" disabled selected hidden>
              Clima de la zona
            </option>
            <option value="tropical">Tropical</option>
            <option value="frio">Frío</option>
            <option value="caluroso">Caluroso</option>
            <option value="templado">Templado</option>
          </>
        )}
        {pholder === "Discapacidad" && clicked && (
          <>
            <option value="" disabled selected hidden>
              Tipo de discapacidad
            </option>
            <option value="ninguna">Ninguna</option>
            <option value="paraplejía">Paraplejía</option>
            <option value="ceguera">Ceguera</option>
            <option value="sordera">Sordera</option>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateComboBox;
