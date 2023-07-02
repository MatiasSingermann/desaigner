interface GoogleButtonProps {
  icon: JSX.Element;
  text: string;
}

function GoogleButton({ icon, text }: GoogleButtonProps) {
  return (
    <button className="bottom-0 mb-[14px] flex h-[40px] w-[310px] items-center justify-center rounded-3xl border-2 border-[#E8E8E8] bg-[#FBF9FA] text-[20px] shadow-xl hover:border-[#BABABA] hover:bg-[#EBEAEA] 480:mb-[30px] 480:h-[44px] 480:w-[342px] 480:text-[22px]">
      <span className="relative flex h-[40px] w-[310px] items-center justify-start self-center pl-2 480:h-[44px] 480:w-[342px]">
        {icon}
      </span>
      <span className="absolute flex self-center justify-self-center font-coolveticaBook font-extralight text-black">
        {text}
      </span>
    </button>
  );
}

export default GoogleButton;
