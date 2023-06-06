import { useState } from "react";

interface InputLoginButtonProps {
  icon: JSX.Element;
  type: string;
  pholder: string;
}

function InputLoginButton({ icon, type, pholder }: InputLoginButtonProps) {
  const [invalid, setInvalid] = useState(true);

  return (
    <div className="group flex items-center justify-start">
      <span
        className={[
          "pointer-events-none absolute mb-[12px] fill-[#228187] pl-2",
          invalid ? "fill-red-600" : "",
        ].join(" ")}
      >
        {icon}
      </span>
      <input
        className="disabled mb-[12px] h-[52px] w-[310px] appearance-none rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-11 text-[20px] text-[#C4C4C4] shadow-md placeholder:text-[#C4C4C4] invalid:border-red-500 invalid:text-red-500 focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent invalid:focus:text-red-500"
        type={type}
        placeholder={pholder}
      />
    </div>
  );
}

export default InputLoginButton;
