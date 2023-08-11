import { useState } from "react";
import Checked from "./Checked";
import Unchecked from "./Unchecked";

function NoImageOption() {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <>
    <div className="flex items-center justify-center mt-[2px]">
      <div className="font-coolveticaRegular text-[20px]">
        Prefiero no subir una imagen
      </div>
      <button onClick={handleCheck} form="false" className="m-[22px]">
        {checked ? <Checked /> : <Unchecked />}
      </button>
    </div>
    <input type="hidden" className="hidden" value={String(checked)} />
    </>
  );
}

export default NoImageOption;
