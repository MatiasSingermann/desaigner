import Cross from "./Cross";
import type { MouseEventHandler } from "react";

interface PWReqsProps {
  toggleReqs: MouseEventHandler<HTMLButtonElement>;
}

function PWReqs({toggleReqs} : PWReqsProps) {
  return (
    <div className="absolute flex flex-col mt-[44px] z-10">
      <div className="relative ml-[50px] flex h-[0px] w-[0px] border-b-[14px] border-l-[14px] border-r-[14px] border-b-[#FBF9FA]  border-l-transparent border-r-transparent dark:border-b-[#293433]"></div>
      <div className="flex h-[86px] w-[310px] items-center justify-between rounded-xl bg-[#FBF9FA] px-[11px] py-[2px] text-[14px] leading-none text-black shadow-xl dark:bg-[#293433] dark:text-[#FBF9FA] 480:h-[120px] 480:w-[350px] 480:text-[18px]">
        <div className="flex w-fit flex-col">
          <h5 className="mb-[6px] font-coolveticaBook">
            La contraseña debe tener:
          </h5>
          <div className="flex">
            <p className="mx-[6px] font-coolveticaLight">•</p>
            <p className="mx-[6px] font-coolveticaLight">
              Mínimo 1 carácter en mayúscula
            </p>
          </div>
          <div className="flex">
            <p className="mx-[6px] font-coolveticaLight">•</p>
            <p className="mx-[6px] font-coolveticaLight">Mínimo 8 caracteres</p>
          </div>
          <div className="flex">
            <p className="mx-[6px] font-coolveticaLight">•</p>
            <p className="mx-[6px] font-coolveticaLight">
              Mínimo 1 carácter especial <br /> (#, _, @, $, !, %, *, ?, &)
            </p>
          </div>
        </div>
        <button className="mr-[10px] 480:scale-[1.3]" onClick={toggleReqs}>
          <Cross />
        </button>
      </div>
    </div>
  );
}

export default PWReqs;
