import type { Dispatch, SetStateAction } from "react";
import FolderPreview from "~/components/FolderPreview";

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

interface ColecFolders {
  foldersInfo: FolderType;
  setShowFolder: Dispatch<SetStateAction<boolean>>;
  setFolderData: Dispatch<SetStateAction<FolderDesigns | undefined | object[]>>;
  setFolderName: Dispatch<SetStateAction<string>>;
}

function ColecFolders({ foldersInfo, setShowFolder, setFolderData, setFolderName }: ColecFolders) {
  return (
    <>
      <h1 className="mx-[32px] mb-[30px] self-start font-coolveticaRegular text-[30px] leading-none text-[#22302D] dark:text-[#FBF9FA]">
        Tus colecciones
      </h1>
      <>
        {foldersInfo?.map((_, i) => (
          <FolderPreview
            key={i}
            index={i}
            foldersInfo={foldersInfo}
            setShowFolder={setShowFolder}
            setFolderData={setFolderData}
            setFolderName={setFolderName}
          />
        ))}
      </>
    </>
  );
}

export default ColecFolders;
