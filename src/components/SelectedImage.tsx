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
      className={`absolute flex h-full w-full flex-col items-center justify-end rounded-xl bg-[#000] px-[16px] py-[4px] text-[#FBF9FA] ${
        imageName === "" ? "-z-10" : "z-10"
      }`}
    >
      <Image
        className="object-contain"
        src="" // ejemplo: "/../public/Imagen.jpg"
        alt="Selected Image"
        height={1500} // altura de la imagen
        width={1500} // ancho de la imagen
      />
      <div className="relative flex w-full items-end justify-between">
        <h3 className="p-[4px]">{imageName}</h3>
        <button className="absolute right-0 flex p-[4px]" onClick={trashClick}>
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default SelectedImage;
