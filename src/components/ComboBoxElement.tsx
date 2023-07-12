interface ComboBoxElementProps {
  name: string;
  text: string;
}

function ComboBoxElement({ name, text }: ComboBoxElementProps) {
  return (
    <div className="relative flex h-[52px] w-[310px] items-center justify-start bg-[#292F2D] dark:bg-[#292F2D] 480:h-[58px] 480:w-[342px]">
      <input
        type="radio"
        name={name}
        className="absolute hidden h-[52px] w-[310px] 480:h-[58px] 480:w-[342px]"
      />
      <p className="mx-[24px] text-[20px] 480:text-[22px]">{text}</p>
    </div>
  );
}

export default ComboBoxElement;
