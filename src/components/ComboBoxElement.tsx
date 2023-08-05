import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface ComboBoxElementProps {
  name: string;
  text: string;
  value: string;
  handleRadioChange: ChangeEventHandler<HTMLInputElement>;
}

function ComboBoxElement({ name, text, value, handleRadioChange }: ComboBoxElementProps) {
  return (
    <div className="relative flex h-[52px] w-[310px] items-center justify-start bg-[#292F2D] dark:bg-[#292F2D] 480:h-[58px] 480:w-[342px]">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleRadioChange}
        className="absolute ahidden h-[52px] w-[310px] 480:h-[58px] 480:w-[342px]"
      />
      <p className="mx-[24px] text-[20px] 480:text-[22px]">{text}</p>
    </div>
  );
}

export default ComboBoxElement;
