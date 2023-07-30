import ImageUploader from "./ImageUploader";

function Step1() {
  return (
    <>
      <h2 className="mx-[32px] self-start font-coolveticaRegular text-[30px] leading-none">
        Paso 1: Adjunta una imagen
      </h2>
      <h3 className="mx-[32px] my-[20px] w-[254px] self-start font-coolveticaLight text-[15px] leading-none">
        La imagen debe ser formato .jpeg o .png con una resolución mínima de
        512x512 píxeles.
      </h3>
      <ImageUploader/>
    </>
  );
}

export default Step1;
