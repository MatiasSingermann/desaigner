import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

type furnitureType = {
  id: number,
  url1: string,
  url2: string,
  url3: string,
  disenio_id: number,
  descripcion: string,
  x: number,
  y: number,
  width: number,
  height: number,
}[];

interface ImgData {
  nombre: string;
  id: number;
  colecciones: string[];
  fecha: string;
  imagen: string;
  muebles: furnitureType;
  ambiente: string;
  presupuesto: string;
  estilo: string;
}

interface FolderDesignsKeys {
  id: number;
  disenio: {
    id: number;
    imagen: string;
  };
}

interface FolderImgPreviewProps {
  folderData: FolderDesignsKeys;
  setShowDesignInfo: Dispatch<SetStateAction<boolean>>;
  setShowFolder: Dispatch<SetStateAction<boolean>>;
  setImageData: Dispatch<SetStateAction<ImgData | undefined>>;
}

function FolderImgPreview({
  folderData,
  setShowDesignInfo,
  setShowFolder,
  setImageData,
}: FolderImgPreviewProps) {
  const openImage = () => {
    const obj = {
      id: folderData.disenio.id,
    };
    fetch("api/auth/diseniosData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data : ImgData) => {
        //console.log(data);
        setImageData(data);
        setShowFolder(false);
        setShowDesignInfo(true);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
  return (
    <button
      onClick={openImage}
      className="mb-[32px] flex flex-col items-center justify-center"
    >
      <Image
        src={folderData.disenio.imagen}
        alt="imagen"
        width={292}
        height={164}
        className="rounded-3xl object-contain"
      />
    </button>
  );
}

export default FolderImgPreview;
