import type {Dispatch, SetStateAction} from 'react';
import Arrow from "../Arrow";
import FolderImgPreview from "../FolderImgPreview";

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

type FolderDesigns = FolderDesignsKeys[];

interface ColecDesign {
  folderData: FolderDesigns | undefined | object[];
  setShowFolder: Dispatch<SetStateAction<boolean>>;
  folderName: string;
  setShowDesignInfo: Dispatch<SetStateAction<boolean>>;
  setImageData: Dispatch<SetStateAction<ImgData | undefined>>;
}

function ColecDesign({ folderData, setShowFolder, folderName, setShowDesignInfo, setImageData }: ColecDesign) {
  const closeFolder = () => {
    setShowFolder(false);
  }
  return (
    <>
      <div className="mx-[26px] mb-[30px] flex items-center justify-center self-start">
        <button onClick={closeFolder} className={`rotate-[90deg] scale-[1.0] fill-[#228187] stroke-[#228187] stroke-2
        }`}>
          <Arrow />
        </button>
        <h1 className="mx-[12px] flex self-start font-coolveticaRegular text-[30px] leading-none text-[#22302D] dark:text-[#FBF9FA]">
          {folderName}
        </h1>
      </div>
      {folderData != undefined &&
        folderData?.map((folder, i) => (
          <FolderImgPreview key={i} folderData={folder as FolderDesignsKeys} setShowDesignInfo={setShowDesignInfo} setShowFolder={setShowFolder} setImageData={setImageData}/>
        ))}
    </>
  );
}

export default ColecDesign;
