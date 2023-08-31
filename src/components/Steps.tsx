import type { Dispatch, SetStateAction } from "react";
import Arrow from "./Arrow";

interface StepsProps {
  setCounter: Dispatch<SetStateAction<number>>;
  counter: number;
}

function Steps({ setCounter, counter }: StepsProps) {
  const counterRest = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
  const counterSum = () => {
    if (counter < 3) {
      setCounter(counter + 1);
    }
  };
  return (
    <div className="mt-[22px] mb-[24px] flex">
      <button
        form="false"
        onClick={counterRest}
        className={`rotate-[90deg] scale-[.6] fill-[#228187] stroke-[#228187] stroke-2 ${
          counter === 1 ? "fill-[#BABABA] stroke-[#BABABA]" : ""
        }`}
      >
        <Arrow />
      </button>
      <h2 className="mx-[2px] text-center font-coolveticaRegular text-[20px] text-[#228187] dark:text-[#228187]">
        {"Paso " + counter.toString() + "/3"}
      </h2>
      <button
        form="false"
        onClick={counterSum}
        className={`rotate-[270deg] scale-[.6] fill-[#228187] stroke-[#228187] stroke-2 ${
          counter === 3 ? "fill-[#BABABA] stroke-[#BABABA]" : ""
        }`}
      >
        <Arrow />
      </button>
    </div>
  );
}

export default Steps;
