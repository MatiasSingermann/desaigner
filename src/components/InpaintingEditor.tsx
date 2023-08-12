import Cross from "./Cross";
import { Dispatch, SetStateAction } from "react";

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function InpaintingEditor({setShowEdit} : InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };
  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
      <div className="relative flex h-[480px] w-[340px] flex-col items-center justify-between rounded-xl bg-gray-500 p-[20px]">
        <button
          onClick={handleClick}
          className="absolute right-0 top-0 m-[20px] flex"
        >
          <Cross />
        </button>
        <h1 className="mt-[50px] text-center font-coolveticaRegular text-[30px]">
          Pinte lo que quiera cambiar
        </h1>
        <div className="my-[20px] flex h-[240px] w-[300px] items-center justify-center rounded-xl bg-black"></div>
        <button form="false" className="flex h-[60px] w-[80px] items-center justify-center rounded-xl bg-green-500">
          Guardar
        </button>
      </div>
    </div>
  );
}

export default InpaintingEditor;
