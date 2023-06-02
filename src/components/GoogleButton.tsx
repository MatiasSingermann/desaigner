interface GoogleButtonProps {
    text: string
}  

function GoogleButton({text} : GoogleButtonProps) {
  return (
    <button className="rounded-3xl text-[20px] w-[310px] h-[40px] border-[#E8E8E8] border-2 bg-[#FBF9FA] shadow-xl">{text}</button>
  )
}

export default GoogleButton