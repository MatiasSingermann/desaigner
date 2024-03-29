import { useState } from "react";
import ShowButton from "./ShowButton";
import PWInfoButton from "./PWInfoButton";
import PWReqs from "./PWReqs";

interface PasswordInputProps {
  icon: JSX.Element;
  pholder: string;
  mlength: number;
  name: string;
}

function PasswordInput({ icon, pholder, mlength, name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [showReqs, setShowReqs] = useState(false);

  const handleCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleReqs = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowReqs(!showReqs);
  };

  return (
    <div className="relative flex">
      <div className="group relative flex items-center justify-start">
        <span className="pointer-events-none absolute mb-[12px] fill-[#228187] left-[14px] 480:mb-[16px]">
          {icon}
        </span>
        <input
          className="disabled mb-[12px] h-[52px] w-[310px] select-none appearance-none rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[60px] pr-[86px] text-[20px] text-[#1D1B25] shadow-md placeholder:text-[#C4C4C4] invalid:border-[#FF8383] invalid:text-[#FF8383] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent invalid:focus:text-[#FF8383] dark:border-[#228187] dark:bg-[#19201F] dark:text-[#FBF9FA] 480:mb-[16px] 480:h-[58px] 480:w-[342px] 480:text-[22px]"
          type={showPassword ? "text" : "password"}
          placeholder={pholder}
          required
          minLength={mlength}
          name={name}
          onCopy={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
        <div className="absolute right-[14px] mb-[12px] flex h-[52px] w-[66px] items-center justify-between 480:mb-[16px]">
          <PWInfoButton showReqs={showReqs} toggleReqs={toggleReqs} />
          <ShowButton
            showPassword={showPassword}
            togglePassword={togglePassword}
          />
        </div>
      </div>
      {showReqs ? <PWReqs toggleReqs={toggleReqs} /> : null}
    </div>
  );
}

export default PasswordInput;
