import { useState } from "react";
import ShowButton from "./ShowButton";

interface PasswordInputProps {
  icon: JSX.Element;
  pholder: string;
  mlength: number;
  name: string;
}

function PasswordInput({ icon, pholder, mlength, name }: PasswordInputProps) {
  
  const [invalid, setInvalid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative group flex items-center justify-start">
      <span
        className={[
          "pointer-events-none absolute mb-[12px] fill-[#228187] pl-2",
          invalid ? "fill-[#FF8383]" : "fill-[#228187]",
        ].join(" ")}
      >
        {icon}
      </span>
      <input
        className="disabled mb-[12px] h-[52px] w-[310px] appearance-none select-none rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[44px] pr-[50px] text-[20px] text-black shadow-md placeholder:text-[#C4C4C4] invalid:border-[#FF8383] invalid:text-[#FF8383] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent invalid:focus:text-[#FF8383] empty:border-[#E8E8E8]"
        type={showPassword ? "text" : "password"}
        placeholder={pholder}
        required
        minLength={mlength}
        name={name}
      />
      <ShowButton showPassword = {showPassword} togglePassword = {togglePassword}/>
    </div>
  );
}

export default PasswordInput;
