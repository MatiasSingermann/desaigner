import Cross from "./Cross";
import type { Dispatch, SetStateAction } from "react";
import Image from 'next/image';

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showEdit: SetStateAction<boolean>;
  inputImage: FormDataEntryValue;
}

function InpaintingEditor({ setShowEdit, showEdit, inputImage }: InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };
  console.log(inputImage);
  const myBlob = new Blob([inputImage], {
    type: "image/jpeg",
  });
  const image = URL.createObjectURL(myBlob);
  return (
    <div className={`top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${showEdit ? "fixed " : "hidden"}`}>
      <div className="relative flex h-[380px] w-[324px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px]">
        <button
          onClick={handleClick}
          className="absolute right-0 top-0 m-[12px] flex"
          form="false"
        >
          <Cross />
        </button>
        <h1 className="mt-[40px] text-center font-coolveticaRegular text-[30px] leading-none text-[#FBF9FA]">
          Dibuje sobre lo que quiere modificar
        </h1>
        <div className="flex flex-col relative justify-center items-center">
          <canvas className="absolute my-[20px] flex h-[160px] w-[292px] items-center justify-center rounded-xl bg-transparent"></canvas>
          <Image className="absolute my-[20px] flex h-[160px] w-[292px] items-center justify-center rounded-xl" src={image} width={292} height={160} alt="Imagen a editar"/>
        </div>
        <button
          form="false"
          className="absolute bottom-0 mb-[38px] flex h-[36px] w-[94px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
        >
          Aceptar
        </button>
      </div>
      <input type="text" name="maskImage" className="hidden" readOnly={true} value="TEST" />
    </div>
  );
}

export default InpaintingEditor;
