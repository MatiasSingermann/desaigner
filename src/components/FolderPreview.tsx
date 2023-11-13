import type { Dispatch, SetStateAction } from "react";
import FolderImg from "./FolderImg";

interface FolderKeys {
  favorito: boolean;
  id: number;
  nombre: string;
  disenios: object[];
}

type FolderType = FolderKeys[];

interface FolderDesignsKeys {
  id: number;
  disenio: {
    id: number,
    imagen: string,
  };
}

type FolderDesigns = FolderDesignsKeys[];

interface FolderPreviewProps {
  index: number,
  foldersInfo: FolderType,
  setShowFolder: Dispatch<SetStateAction<boolean>>,
  setFolderData: Dispatch<SetStateAction<FolderDesigns | undefined | object[]>>,
  setFolderName: Dispatch<SetStateAction<string>>,
}

function FolderPreview({ index, foldersInfo, setShowFolder, setFolderData, setFolderName }: FolderPreviewProps) {
  const obj = {
    coleccion: foldersInfo[index]!.nombre,
  }
  const openFolder = () => {
    fetch("api/auth/Disenios", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data : FolderKeys) => {
        //console.log(data);
        setFolderData(data.disenios);
        setFolderName(foldersInfo[index]!.nombre);
        setShowFolder(true);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
  return (
    <button onClick={openFolder} className="flex h-[60px] w-full items-center justify-between px-[42px] mb-[32px]">
      <div className="flex flex-col items-start">
        <p className="font-coolveticaBook text-[30px] leading-none mb-[10px]">
          {foldersInfo[index]!.nombre}
        </p>
        <p className="font-coolveticaLight text-[20px] leading-none">
          {foldersInfo[index]!.disenios.length == 1
            ? "1 diseño"
            : foldersInfo[index]!.disenios.length.toString() + " diseños"}
        </p>
      </div>
      <FolderImg />
    </button>
  );
}

export default FolderPreview;
