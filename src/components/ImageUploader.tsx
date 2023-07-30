import { useState } from 'react';
import Upload from './Upload';

function ImageUploader() {
  const [image, setImage] = useState("");
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files![0];
    console.log(selectedImage?.name);
    // setImage(selectedImage);
  }
  const submitImage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={submitImage}
      className="relative flex h-[180px] w-[330px] flex-col items-center justify-center rounded-xl bg-[#E8E8E8] p-[22px] text-[#292F2D]"
    >
      <div className="flex flex-col">
        <Upload/>
      </div>
      <h3 className="mt-[16px] font-coolveticaRegular text-[15px] leading-none">
        Arrastra una imagen aquí
      </h3>
      <div className="mb-[8px] mt-[8px] flex flex-row items-center justify-center">
        <hr className="mr-2 w-[80px] border-[#292F2D]" />
        <p className="pb-[3px] text-center text-[12px]">o</p>
        <hr className="ml-2 w-[80px] border-[#292F2D]" />
      </div>
      <div className="relative flex flex-col items-center justify-center" aria-label="Selecciona un archivo">
        <input type="file" onChange={handleImage} className="absolute flex inset-0 w-full h-full opacity-0" />
        <div className="flex items-center justify-center rounded-xl bg-[#228187] font-coolveticaRegular text-[12px] cursor-pointer h-[24px] w-[88px] text-center text-[#FBF9FA] shadow-xl">
          {image == null ? "Subir archivo..." : image}
          Subir archivo...
        </div>
      </div>
    </form>
  );
}

export default ImageUploader;
