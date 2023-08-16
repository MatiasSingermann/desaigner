import { SetStateAction, useState } from "react";

interface CreateButtonProps {
  counter: SetStateAction<number>;
}

function CreateButton({counter} : CreateButtonProps) {

  const [stepsFinished, setstepsFinished] = useState(false)

  if(counter === 3 && stepsFinished === false) {
    setstepsFinished(true);
  }

  return (
    <button
      type="submit"
      className={`mb-[130px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111] ${stepsFinished ? "bg-gradient-to-b from-[#59C3C3] to-[#228187]" : "bg-[#BABABA] pointer-events-none"}`}
    >
      Generar diseño
    </button>
  );
}

export default CreateButton;
