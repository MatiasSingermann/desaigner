import CreateButton from "./CreateButton";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Steps from "./Steps";
import { Dispatch, SetStateAction, useState } from "react";

interface StepShowProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function StepShow({setShowEdit} : StepShowProps) {
  let [counter, setCounter] = useState(1);
  return (
    <>
      <Step1 counter={counter} setShowEdit={setShowEdit}/>
      <Step2 counter={counter} />
      <Step3 counter={counter} />
      <Steps setCounter={setCounter} counter={counter} />
      <CreateButton counter={counter}/>
    </>
  );
}

export default StepShow;
