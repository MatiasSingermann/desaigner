import CreateButton from "./CreateButton";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Steps from "./Steps";
import { useState } from "react";

function StepShow() {
  let [counter, setCounter] = useState(1);
  return (
    <>
      {counter === 1 && <Step1 />}
      {counter === 2 && <Step2 />}
      {counter === 3 && <Step3 />}
      <Steps setCounter={setCounter} counter={counter} />
      {counter === 3 && <CreateButton />}
    </>
  );
}

export default StepShow;
