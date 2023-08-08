import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface SliderProps {
  setSlider: Dispatch<SetStateAction<number>>
}

function Slider({setSlider} : SliderProps) {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const imgNumber = Number(e.target.value)
    setSlider(imgNumber)
  }
  return (
    <input
      className="mb-[8px] mt-[44px] h-[10px] w-[226px] cursor-pointer"
      type="range"
      min={1}
      max={4}
      defaultValue={1}
      onChange={changeValue}
    ></input>
  );
}

export default Slider;
