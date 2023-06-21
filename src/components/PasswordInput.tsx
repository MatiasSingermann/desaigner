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
  const [invalid, setInvalid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showReqs, setShowReqs] = useState(false);

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
        <span
          className={[
            "pointer-events-none absolute mb-[12px] fill-[#228187] pl-2",
            invalid ? "fill-[#FF8383]" : "fill-[#228187]",
          ].join(" ")}
        >
          {icon}
        </span>
        <input
          className="disabled mb-[12px] h-[52px] w-[310px] select-none appearance-none rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] pl-[44px] pr-[86px] text-[20px] text-black shadow-md placeholder:text-[#C4C4C4] invalid:border-[#FF8383] invalid:text-[#FF8383] empty:border-[#E8E8E8] focus:border-[2.5px] focus:outline-none focus:placeholder:text-transparent invalid:focus:text-[#FF8383] dark:border-[#228187] dark:bg-[#19201F] dark:text-[#FBF9FA]"
          type={showPassword ? "text" : "password"}
          placeholder={pholder}
          required
          minLength={mlength}
          name={name}
        />
        <PWInfoButton showReqs={showReqs} toggleReqs={toggleReqs}/>
        <ShowButton
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      </div>
      {showReqs ? <PWReqs toggleReqs={toggleReqs}/> : null}
    </div>
  );
}

export default PasswordInput;
