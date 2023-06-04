interface GoogleButtonProps {
  icon: JSX.Element
  text: string
}  

function GoogleButton({icon, text} : GoogleButtonProps) {
  return (
    <button className="flex justify-center items-center rounded-3xl text-[20px] w-[310px] h-[40px] border-[#E8E8E8] border-2 bg-[#FBF9FA] shadow-xl">
      <span className="flex justify-start items-center pl-2 self-center relative w-[310px] h-[40px]">
        {icon}
      </span>
      <span className="flex justify-self-center self-center absolute font-coolveticaBook font-extralight">
        {text}
      </span>
    </button>
  )
}

export default GoogleButton