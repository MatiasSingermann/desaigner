import { useRef } from "react";
import Cross from "./Cross";
import type { Dispatch, SetStateAction } from "react";

interface FolderCreatorProps {
  setShowFolderCreator: Dispatch<SetStateAction<boolean>>;
  showFolderCreator: SetStateAction<boolean>;
}

function FolderCreator({
  setShowFolderCreator,
  showFolderCreator,
}: FolderCreatorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const createFolder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }

    const nombre = inputData[0] ? inputData[0][1] : "";
    const nombreString = nombre.toString();

    const obj = {
      nombre: nombreString,
      favorito: false,
    };
    fetch("api/auth/createColeccion", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    setShowFolderCreator(false);
  };
  const handleClick = () => {
    setShowFolderCreator(false);
  };
  return (
    <div
      className={`top-0 z-[1000] flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${
        showFolderCreator ? "fixed " : "hidden"
      }`}
    >
      <div className="relative flex h-[226px] w-[324px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px]">
        <button
          onClick={handleClick}
          className="absolute right-0 top-0 m-[12px] flex"
          form="false"
        >
          <Cross />
        </button>
        <h1 className="mt-[40px] text-center font-coolveticaRegular text-[30px] leading-none text-[#FBF9FA]">
          Nueva carpeta
        </h1>
        <form
          className="flex h-fit flex-col items-center justify-center"
          action="/home"
          method="POST"
          onSubmit={createFolder}
          ref={formRef}
          noValidate
        >
          <input
            type="text"
            name="folderName"
            placeholder="Nombre (máx. 12 caracteres)"
            className="my-[24px] flex h-[42px] w-[248px] items-center justify-center rounded-2xl border-[2px] border-[#228187] bg-[#19201F] px-[20px] font-coolveticaLight text-[18px] text-[#BABABA]"
          />
          <button
            type="submit"
            className="mb-[38px] flex h-[36px] w-[130px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FolderCreator;
