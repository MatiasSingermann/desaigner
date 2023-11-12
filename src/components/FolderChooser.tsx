// import type { FullDataImage } from "~/hooks/useImageData";
import { useState, useEffect } from "react";
import type { RefObject } from "react";
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
  imgFormRef: RefObject<HTMLFormElement>;
}

type FullDataImage = InputImageDataProps[];

interface FolderKeys {
  favorito: boolean;
  id: number;
  nombre: string;
  disenios: object[];
}

type FolderType = FolderKeys[];

function FolderChooser({
  environment,
  budget,
  style,
  image,
  furniture,
  imgFormRef,
}: FolderChooserProps) {
  const [showFolderCreator, setShowFolderCreator] = useState(false);
  const [foldersInfo, setFoldersInfo] = useState<FolderType | undefined>();
  useEffect(() => {
    fetch("api/auth/Colecciones", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data: FolderType) => {
        //console.log(data);
        setFoldersInfo(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [showFolderCreator]);
  const handleNewFolder = () => {
    setShowFolderCreator(true);
  };
  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   let base64String = "";

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const arrayBuffer = reader.result as ArrayBuffer;
  //     const byteArray = new Uint8Array(arrayBuffer);
  //     base64String = base64.fromByteArray(byteArray);
  //   };
  //   reader.readAsArrayBuffer(image);

  //   const formData = new FormData(e.currentTarget);
  //   const inputData = [];

  //   for (const pair of formData.entries()) {
  //     inputData.push(pair);
  //   }

  //   const nombre = inputData[0] ? inputData[0][1] : "";
  //   const coleccion = inputData[1] ? inputData[1][1] : "";

  //   const obj = {
  //     nombre: nombre,
  //     ambiente: environment,
  //     disenioIMG: base64String,
  //     muebles: furniture,
  //     presupuesto: budget,
  //     estilo: style,
  //     colecciones: coleccion,
  //   };

  //   fetch("api/auth/createDisenio", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //console.log(data);
  //     })
  //     .catch((error: Error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <>
      <div className="fixed bottom-0 z-[1000] flex h-[388px] w-full flex-col items-center rounded-t-[4rem] bg-[#293433] py-[26px]">
        <div className="h-[9px] w-3/5 rounded-xl bg-[#2A9DA5]"></div>
        {foldersInfo != undefined && (
          <div className="my-[24px] flex w-[280px] flex-col items-center justify-start overflow-y-scroll">
            {foldersInfo?.map((_, i) => (
              <FolderSelector
                key={i}
                index={i}
                foldersInfo={foldersInfo}
                imgFormRef={imgFormRef}
              />
            ))}
          </div>
        )}
        <hr className="mb-[14px] w-3/5 border-[#FBF9FA]" />
        <button
          form="false"
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
