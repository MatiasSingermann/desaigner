import Image from "next/image";
import Trash from "./Trash";

interface SelectedImageProps {
  image: any;
  imageName: string;
  updateImageData: (newImage: any, newImageName: string) => void;
}

function SelectedImage({
  image,
  imageName,
  updateImageData,
}: SelectedImageProps) {
  const trashClick = () => {
    updateImageData(null, "");
  };
  return (
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
        <button className="flex p-[4px]" onClick={trashClick}>
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default SelectedImage;
