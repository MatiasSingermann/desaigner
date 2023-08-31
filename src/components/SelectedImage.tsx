import Image from "next/image";
import Trash from "./Trash";
import type { Dispatch, SetStateAction } from "react";
import Brush from "./Brush";

interface SelectedImageProps {
  image: any;
  imageName: string;
  updateImageData: (newImage: any, newImageName: string) => void;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function SelectedImage({
  image,
  imageName,
  updateImageData,
  setShowEdit,
}: SelectedImageProps) {
  const pencilClick = () => {
    setShowEdit(true);
  };
  const trashClick = () => {
    updateImageData(null, "");
  };
  return (
    <>
      <div
        className={`absolute flex h-full w-full flex-col items-center justify-end rounded-xl bg-[#1B1F1F] px-[16px] text-[#FBF9FA] ${
          imageName === "" ? "-z-10" : "z-10"
        }`}
      >
        {image ? (
          <Image
            className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
            src={image} // ejemplo: "/../public/Imagen.jpg"
            alt="Selected Image"
            height={1500} // altura de la imagen
            width={1500} // ancho de la imagen
          />
        ) : null}
        <div className="absolute flex h-1/2 w-full rounded-xl bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute flex w-full items-center justify-between rounded-b-xl px-[8px] pb-[2px]">
          <h3 className="p-[4px]">{imageName}</h3>
          <div className="flex items-center justify-center">
            <button
              form="false"
              className="mr-[2px] flex p-[4px] "
              onClick={pencilClick}
            >
              <Brush />
            </button>
            <button
              form="false"
              className="mr-[2px] flex p-[4px]"
              onClick={trashClick}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectedImage;
