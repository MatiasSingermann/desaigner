import ImageNumBox from "./ImageNumBox";
import Slider from "./Slider";

function Step3() {
  return (
    <>
      <h2 className="mx-[32px] mb-[52px] self-start font-coolveticaRegular text-[30px] leading-none">
        Paso 3: Elige la cantidad de imágenes
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          <ImageNumBox number="1" status={true} />
          <ImageNumBox number="2" status={false} />
          <ImageNumBox number="3" status={false} />
          <ImageNumBox number="4" status={false} />
        </div>
        <Slider/>
      </div>
    </>
  );
}

export default Step3;
