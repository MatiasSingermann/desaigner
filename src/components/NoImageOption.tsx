import Checked from "./Checked";
import Unchecked from "./Unchecked";
import {Dispatch, SetStateAction} from 'react'

interface NoImageOptionProps {
    setChecked: Dispatch<SetStateAction<boolean>>
    checked: SetStateAction<boolean>
}

function NoImageOption({setChecked, checked} : NoImageOptionProps) {
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
