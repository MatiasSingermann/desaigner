// import type { FullDataImage } from "~/hooks/useImageData";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { RefObject } from "react";
import FolderCreator from "./FolderCreator";
import FolderSelector from "./FolderSelector";

interface InputImageDataProps {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
}

interface FolderChooserProps {
  imgFormRef: RefObject<HTMLFormElement>;
  setSelectedFolder: Dispatch<SetStateAction<string>>;
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
  imgFormRef,
  setSelectedFolder,
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
                setSelectedFolder={setSelectedFolder}
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
