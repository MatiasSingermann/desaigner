import Cross from "./Cross";
import { Dispatch, SetStateAction } from "react";

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function InpaintingEditor({ setShowEdit }: InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };
  return (
    <div className="fixed top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70">
      <div className="relative flex h-[380px] w-[324px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px]">
        <button
          onClick={handleClick}
          className="absolute right-0 top-0 m-[12px] flex"
        >
          <Cross />
        </button>
        <h1 className="mt-[40px] text-center font-coolveticaRegular text-[30px] leading-none">
          Dibuje sobre lo que quiere modificar
        </h1>
        <div className="my-[20px] flex h-[160px] w-[292px] items-center justify-center rounded-xl bg-black"></div>
        <button
          form="false"
          className="mb-[38px] bottom-0 absolute flex h-[36px] w-[94px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default InpaintingEditor;
