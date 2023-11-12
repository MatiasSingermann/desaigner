import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

interface ImgData {
  nombre: string;
  id: number;
  colecciones: string[];
  fecha: string;
  imagen: string;
  muebles: FullDataImage;
  ambiente: string;
  presupuesto: string;
  estilo: string;
}

interface InputImageDataProps {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
}

type FullDataImage = InputImageDataProps[];

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
        src={folderData!.disenio.imagen}
        alt="imagen"
        width={292}
        height={164}
        className="rounded-3xl object-contain"
      />
    </button>
  );
}

export default FolderImgPreview;
