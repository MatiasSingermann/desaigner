interface GoogleButtonProps {
  icon: JSX.Element;
  text: string;
}

function GoogleButton({ icon, text }: GoogleButtonProps) {
  return (
    <button className="absolute bottom-0 mb-[14px] flex h-[40px] w-[310px] items-center justify-center rounded-3xl border-2 border-[#E8E8E8] bg-[#FBF9FA] text-[20px] shadow-xl hover:border-[#BABABA] hover:bg-[#EBEAEA] 720:mb-[30px] 720:w-[510px]">
      <span className="relative flex h-[40px] w-[310px] items-center justify-start self-center pl-2 720:w-[510px]">
        {icon}
      </span>
      <span className="absolute flex self-center justify-self-center font-coolveticaBook font-extralight text-black">
        {text}
      </span>
    </button>
  );
}

export default GoogleButton;
