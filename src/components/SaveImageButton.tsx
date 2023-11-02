import type { MouseEventHandler } from "react";

interface SaveImageButtonProps {
  handleFolders: MouseEventHandler<HTMLButtonElement>;
}

function SaveImageButton({ handleFolders }: SaveImageButtonProps) {
  return (
    <button
      onClick={handleFolders}
      className="mb-[48px] mt-[32px] flex h-[36px] w-[150px] items-center justify-between rounded-3xl bg-[#59C3C3] pl-[14px] pr-[42px] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#999] dark:bg-[#2A9DA5] dark:shadow-[#111]"
    >
      Añadir a carpeta
    </button>
  );
}

export default SaveImageButton;
