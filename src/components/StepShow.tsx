import CreateButton from "./CreateButton";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Steps from "./Steps";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface StepShowProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
}

function StepShow({setShowEdit, image, setImage} : StepShowProps) {
  const [counter, setCounter] = useState(1);
  return (
    <>
      <Step1 counter={counter} setShowEdit={setShowEdit} image={image} setImage={setImage}/>
      <Step2 counter={counter} />
      <Step3 counter={counter} />
      <Steps setCounter={setCounter} counter={counter} />
      <CreateButton counter={counter}/>
    </>
  );
}

export default StepShow;
