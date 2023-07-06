import type { MouseEventHandler } from "react";

interface LoginSwitchProps {
  login: boolean;
  toggleSwitch: MouseEventHandler<HTMLButtonElement>;
}

function LoginSwitch({ login, toggleSwitch }: LoginSwitchProps) {
  return (
    <div className="relative my-[20px] flex h-[38px] w-[250px] items-center justify-center 480:h-[46px] 480:w-[300px] 480:my-[36px]">
      <button
        className="relative flex h-[38px] w-[250px] items-center rounded-3xl bg-[#228187] shadow-lg dark:bg-[#293433] 480:h-[46px] 480:w-[300px]"
        onClick={toggleSwitch}
        aria-label={`Cambiar a modo ${login ? "register" : "login"}`}
      >
        <div
          className={`absolute flex h-[38px] w-[124px] items-center justify-center rounded-3xl bg-[#009E95] shadow-lg transition-all 480:h-[46px] 480:w-[148px] ${
            login ? "left-0" : "right-0"
          }`}
        ></div>
        <div className="absolute flex h-[38px] w-[250px] items-center justify-between pl-[28px] pr-[16px] text-center font-coolveticaRegular text-[25px] 480:text-[30px] 480:h-[46px] 480:w-[300px]">
          <span className="flex items-center justify-center text-[#FBF9FA] pl-[6px] 480:pl-[14px]">
            Login
          </span>
          <span className="flex items-center justify-center text-[#FBF9FA] pr-[5px] 480:pr-[9px]">
            Sign Up
          </span>
        </div>
      </button>
    </div>
  );
}

export default LoginSwitch;
