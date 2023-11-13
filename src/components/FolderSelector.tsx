import type { RefObject } from "react";
import type { Dispatch, SetStateAction } from "react";

interface FolderKeys {
  favorito : boolean,
  id : number,
  nombre : string,
  disenios : object[],
}

type FolderType = FolderKeys[];

interface FolderSelectorProps {
  index: number;
  foldersInfo: FolderType;
  imgFormRef: RefObject<HTMLFormElement>;
  setSelectedFolder: Dispatch<SetStateAction<string>>;
}

function FolderSelector({ index, foldersInfo, imgFormRef, setSelectedFolder }: FolderSelectorProps) {
  const uploadImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedFolder(foldersInfo[index]!.nombre);
    imgFormRef.current!.requestSubmit();
  }
  return (
    <button onClick={uploadImage} className="relative flex h-[50px] w-[238px] items-center justify-between mb-[12px]">
      <div className="flex flex-col items-start text-[#FBF9FA]">
        <p className="font-coolveticaRegular text-[25px] leading-none mb-[2px]">
          {foldersInfo[index]!.nombre}
        </p>
        <p className="font-coolveticaLight text-[11px] leading-none">
          {foldersInfo[index]!.disenios.length == 1 ? "1 diseño" : foldersInfo[index]!.disenios.length.toString() + " diseños"}
        </p>
      </div>
      <div className="flex h-[40px] w-[40px] flex-wrap items-start">
        {foldersInfo[index]!.disenios.length > 0 && (
            <div className="w-[20px] h-[20px] bg-[#202020]"></div>
        )}
        {foldersInfo[index]!.disenios.length > 1 && (
            <div className="w-[20px] h-[20px] bg-[#FF0000]"></div>
        )}
        {foldersInfo[index]!.disenios.length > 2 && (
            <div className="w-[20px] h-[20px] bg-[#0000FF]"></div>
        )}
        {foldersInfo[index]!.disenios.length > 3 && (
            <div className="w-[20px] h-[20px] bg-[#FFC0CB]"></div>
        )}
      </div>
    </button>
  );
}

export default FolderSelector;
