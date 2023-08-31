import ImageUploader from "./ImageUploader";
import NoImageOption from "./NoImageOption";
import SelectedImage from "./SelectedImage";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import ImageUploaderBlack from "./ImageUploaderBlack";

interface Step1Props {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  counter: SetStateAction<number>;
}

function Step1({ setShowEdit, counter }: Step1Props) {
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("");
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("")
  const updateImageData = (newImage: any, newImageName: string) => {
    setImage(newImage);
    setImageName(newImageName);
  };
  return (
    <div
      className={`h-full w-full items-center justify-center ${
        counter === 1 ? "flex flex-col" : "hidden"
      }`}
    >
      <h1 className="mx-[32px] mb-[52px] self-start bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text font-coolveticaRegular text-[40px] leading-none text-transparent">
        Comencemos
      </h1>
      <h2 className="mx-[32px] self-start font-coolveticaRegular text-[30px] leading-none">
        Paso 1: Adjunta una imagen
      </h2>
      <h3 className="mx-[32px] my-[20px] w-[254px] self-start font-coolveticaLight text-[15px] leading-none">
        La imagen debe ser formato .jpg (.jpeg) o .png con una resolución mínima
        de 512x512 píxeles.
      </h3>
      <div className="relative flex h-[180px] w-[330px] flex-col">
        {checked ? <ImageUploaderBlack /> : null}
        <SelectedImage
          image={image}
          imageName={imageName}
          updateImageData={updateImageData}
          setShowEdit={setShowEdit}
        />
        <ImageUploader
          image={image}
          imageName={imageName}
          updateImageData={updateImageData}
          value={value}
        />
      </div>
      <NoImageOption setChecked={setChecked} checked={checked} />
    </div>
  );
}

export default Step1;
