import { Dispatch, SetStateAction, useState } from "react";
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
    <div className="mt-[22px] flex">
      <button
        onClick={counterRest}
        className={`rotate-[90deg] scale-[.6] stroke-[#228187] fill-[#228187] stroke-2 ${counter === 1 && "stroke-[#BABABA] fill-[#BABABA]"}`}
      >
        <Arrow />
      </button>
      <h2 className="mx-[2px] text-center font-coolveticaRegular text-[20px] text-[#228187] dark:text-[#228187]">
        {"Paso " + counter.toString() + "/3"}
      </h2>
      <button
        onClick={counterSum}
        className={`rotate-[270deg] scale-[.6] stroke-[#228187] fill-[#228187] stroke-2 ${counter === 3 && "stroke-[#BABABA] fill-[#BABABA]"}`}
      >
        <Arrow />
      </button>
    </div>
  );
}

export default Steps;
