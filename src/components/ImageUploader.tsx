import Upload from "./Upload";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ImageUploaderProps {
  image: any;
  imageName: string;
  updateImageData: (newImage: any, newImageName: string) => void;
}

function ImageUploader({
  image,
  imageName,
  updateImageData,
}: ImageUploaderProps) {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files![0];
    
    if (!selectedImage) {
      return;
    }
    if (
      selectedImage!.type != "image/png" &&
      selectedImage!.type != "image/jpeg"
    ) {
      toast.error(
        "Solo se permiten archivos de tipo .png y .jpg (.jpeg)",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else {
      imageName = selectedImage!.name;
      console.log(selectedImage!.type);

      image = URL.createObjectURL(selectedImage!);

      console.log(imageName);
      console.log(e.target.files);
      updateImageData(image, imageName);
    }
  };
  const dragImage = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
    }
  };
  return (
    <div
      className={`absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-[#E8E8E8] p-[22px] text-[#292F2D] dark:bg-[#293433] dark:text-[#FBF9FA] ${
        imageName === "" ? "z-10" : "-z-10"
      }`}
      onDrag={dragImage}
    >
      <div className="flex flex-col">
        <Upload />
      </div>
      <h3 className="mt-[16px] font-coolveticaRegular text-[15px] leading-none">
        Arrastra una imagen aquí
      </h3>
      <div className="mb-[8px] mt-[8px] flex flex-row items-center justify-center">
        <hr className="mr-2 w-[80px] border-[#292F2D] dark:border-[#FBF9FA]" />
        <p className="pb-[3px] text-center text-[12px]">o</p>
        <hr className="ml-2 w-[80px] border-[#292F2D] dark:border-[#FBF9FA]" />
      </div>
      <div
        className="relative flex flex-col items-center justify-center"
        aria-label="Selecciona un archivo"
      >
        <input
          type="file"
          onChange={handleImage}
          value=""
          className="absolute inset-0 flex h-full w-full opacity-0"
        />
        <div className="flex h-[24px] w-[88px] cursor-pointer items-center justify-center rounded-xl bg-[#228187] text-center font-coolveticaRegular text-[12px] text-[#FBF9FA] shadow-xl">
          Subir archivo...
        </div>
      </div>
      <ToastContainer limit={3} />
    </div>
  );
}

export default ImageUploader;
