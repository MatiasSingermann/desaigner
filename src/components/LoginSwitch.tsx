import { useState } from "react";
import { MouseEventHandler } from "react";

interface LoginSwitchProps {
  login: boolean;
  toggleSwitch: MouseEventHandler<HTMLButtonElement>;
}

function LoginSwitch({login, toggleSwitch} : LoginSwitchProps) {
  return (
    <div className="relative flex h-[38px] w-[250px] items-center justify-center my-[20px]">
      <button
        className="relative flex h-[38px] w-[250px] items-center rounded-3xl bg-[#228187] shadow-lg"
        onClick={toggleSwitch}
      >
        <div
          className={`absolute flex h-[38px] w-[124px] items-center justify-center rounded-3xl bg-[#009E95] shadow-lg transition-all ${
            login ? "left-0" : "right-0"
          }`}
        ></div>
        <div className="absolute flex h-[38px] w-[250px] items-center justify-between pl-[28px] pr-[16px] text-center font-coolveticaRegular text-[24px]">
          <span className="flex h-[24px] w-[68px] items-center justify-center text-[#FBF9FA]">
            Login
          </span>
          <span className="flex h-[24px] w-[90px] items-center justify-center text-[#FBF9FA]">
            Sign Up
          </span>
        </div>
      </button>
    </div>
  );
}

export default LoginSwitch;
