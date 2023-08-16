import ImageNumBox from "./ImageNumBox";
import Slider from "./Slider";
import { useState } from "react";
import { SetStateAction } from "react";

interface Step3Props {
  counter: SetStateAction<number>;
}

function Step3({ counter }: Step3Props) {
  const [slider, setSlider] = useState(1);

  return (
    <div
      className={`h-full w-full items-center justify-center ${
        counter === 3 ? "flex flex-col" : "hidden"
      }`}
    >
      <h2 className="mx-[32px] mb-[52px] self-start font-coolveticaRegular text-[30px] leading-none">
        Paso 3: Elige la cantidad de imágenes
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          <ImageNumBox number="1" status={slider >= 1} />
          <ImageNumBox number="2" status={slider >= 2} />
          <ImageNumBox number="3" status={slider >= 3} />
          <ImageNumBox number="4" status={slider >= 4} />
        </div>
        <Slider setSlider={setSlider} />
      </div>
    </div>
  );
}

export default Step3;
