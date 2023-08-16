import CreateComboBox from "~/components/CreateComboBox";
import Presupuesto from "~/components/Presupuesto";
import Estilo from "~/components/Estilo";
import Plano from "~/components/Plano";
import Clima from "~/components/Clima";
import Discapacidad from "~/components/Discapacidad";
import { SetStateAction } from "react";

interface Step2Props {
  counter: SetStateAction<number>;
}

function Step2({ counter }: Step2Props) {
  return (
    <div
      className={`h-full w-full items-center justify-center ${
        counter === 2 ? "flex flex-col" : "hidden"
      }`}
    >
      <h2 className="mx-[32px] mb-[52px] self-start font-coolveticaRegular text-[30px] leading-none">
        Paso 2: Elige tus preferencias
      </h2>
      <div className="flex flex-col">
        <CreateComboBox icon={<Presupuesto />} pholder="Presupuesto" />
        <CreateComboBox icon={<Estilo />} pholder="Estilo" />
        <CreateComboBox icon={<Plano />} pholder="Tipo" />
        <CreateComboBox icon={<Clima />} pholder="Clima" />
        <CreateComboBox icon={<Discapacidad />} pholder="Discapacidad" />
      </div>
    </div>
  );
}

export default Step2;
