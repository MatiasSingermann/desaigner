import { ChangeEventHandler } from "react";

interface ComboBoxElementProps {
  name: string;
  text: string;
  value: string;
  handleRadioChange: ChangeEventHandler<HTMLInputElement>;
}

function ComboBoxElement({ name, text, value, handleRadioChange }: ComboBoxElementProps) {
  return (
    <div className="relative flex h-[52px] w-[310px] items-center justify-start 480:h-[58px] 480:w-[342px]">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleRadioChange}
        className="absolute opacity-0 h-[52px] w-[310px] 480:h-[58px] 480:w-[342px]"
        required
      />
      <p className="mx-[24px] text-[20px] 480:text-[22px]">{text}</p>
    </div>
  );
}

export default ComboBoxElement;
