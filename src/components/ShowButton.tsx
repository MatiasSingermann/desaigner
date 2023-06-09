import EyeClosed from "./EyeClosed";
import EyeOpen from "./EyeOpen";
import { useState } from "react";

function ShowButton() {
  const [show, setShow] = useState(false);

  const handleButton = () => {
    setShow(!show);
  };

  return (
    <button className={"flex justify-center items-center absolute mb-[12px] pr-3 right-0 h-[52px]"} onClick={handleButton}>
      {show ? <EyeOpen /> : <EyeClosed />}
    </button>
  );
}

export default ShowButton;
