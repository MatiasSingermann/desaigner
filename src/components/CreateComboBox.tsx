interface CreateComboBoxProps {
  icon: JSX.Element;
  pholder: string;
  name: string;
}

function CreateComboBox({ icon, pholder, name }: CreateComboBoxProps) {
  const handleCopyPaste = (e: React.ClipboardEvent<HTMLSelectElement>) => {
    e.preventDefault();
  };
  return (
    <div className="group relative flex items-center justify-start">
      <span className="pointer-events-none absolute mb-[12px] fill-[#228187] pl-[14px] 480:mb-[16px]">
        {icon}
      </span>
      <select
        className="disabled mb-[12px] h-[52px] w-[310px] select-none appearance-none rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[60px] pr-[10px] text-[20px] text-black shadow-md placeholder:text-[#C4C4C4] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent dark:border-[#228187] dark:bg-[#19201F] dark:text-[#FBF9FA] 480:mb-[16px] 480:h-[58px] 480:w-[342px] 480:text-[22px]"
        placeholder={pholder}
        required
        name={name}
        onCopy={handleCopyPaste}
        onPaste={handleCopyPaste}
      >
        <option value="" disabled selected hidden>Presupuesto</option>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
    </select>
    </div>
  );
}

export default CreateComboBox;
