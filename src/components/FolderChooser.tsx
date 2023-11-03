// import type { FullDataImage } from "~/hooks/useImageData";
import { useState } from "react";
import base64 from "base64-js";
import FolderCreator from "./FolderCreator";
import FolderSelector from "./FolderSelector";

interface InputImageDataProps {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
}

interface FolderChooserProps {
  environment: string;
  budget: string;
  style: string;
  image: Blob;
  furniture: FullDataImage;
}

type FullDataImage = InputImageDataProps[];

function FolderChooser({
  environment,
  budget,
  style,
  image,
  furniture,
}: FolderChooserProps) {
  const [showFolderCreator, setShowFolderCreator] = useState(false);
  const [foldersInfo, setFoldersInfo] = useState<string[] | undefined>();
  const handleNewFolder = () => {
    setShowFolderCreator(true);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let base64String = "";

    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      base64String = base64.fromByteArray(byteArray);
    };
    reader.readAsArrayBuffer(image);

    const formData = new FormData(e.currentTarget);
    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }

    const nombre = inputData[0] ? inputData[0][1] : "";
    const coleccion = inputData[1] ? inputData[1][1] : "";

    const obj = {
      nombre: nombre,
      ambiente: environment,
      disenioIMG: base64String,
      muebles: furniture,
      presupuesto: budget,
      estilo: style,
      colecciones: coleccion,
    };

    fetch("api/auth/createDisenio", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
  fetch("api/auth/Colecciones", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // setFoldersInfo(data);
    })
    .catch((error: Error) => {
      console.log(error);
    });
  return (
    <>
      <div className="fixed bottom-0 z-[1000] flex h-[388px] w-full flex-col items-center rounded-t-[4rem] bg-[#293433] py-[26px]">
        <div className="wasdasd-[232px] h-[9px] w-3/5 rounded-xl bg-[#2A9DA5]"></div>
        <div className="my-[24px] flex w-[238px] flex-col overflow-y-scroll">
          {foldersInfo?.map((_, i) => (
            <FolderSelector index={i} />
          ))}
          {/* {foldersInfo.forEach()} */}
          {/* <FolderSelector index={index}/> */}
        </div>
        <hr className="mb-[14px] w-3/5 border-[#FBF9FA]" />
        <button
          onClick={handleNewFolder}
          className="text-center font-coolveticaRegular text-[25px] text-[#FBF9FA]"
        >
          Nueva carpeta
        </button>
      </div>
      {showFolderCreator && (
        <FolderCreator
          setShowFolderCreator={setShowFolderCreator}
          showFolderCreator={showFolderCreator}
        />
      )}
    </>
  );
}

export default FolderChooser;
