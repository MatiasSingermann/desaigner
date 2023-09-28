import type { MouseEventHandler } from "react";
import Bookmark from "./Bookmark";

interface SaveImageButtonProps {
  handleSaveImage: MouseEventHandler<HTMLButtonElement>;
}

function SaveImageButton({ handleSaveImage }: SaveImageButtonProps) {
  return (
    <button
      onClick={handleSaveImage}
      className="mb-[48px] mt-[32px] flex h-[40px] w-[160px] items-center justify-between rounded-3xl bg-[#59C3C3] pl-[14px] pr-[42px] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#999] dark:bg-[#2A9DA5] dark:shadow-[#111]"
    >
      <Bookmark />
      Guardar
    </button>
  );
}

export default SaveImageButton;
