interface InputLoginButtonProps {
    // logo: string,
    type: string
    pholder: string
}  

function InputLoginButton({type, pholder} : InputLoginButtonProps) {
  return (
    <input className="border-2 border-[#E8E8E8] bg-[#FBF9FA] text-[#C4C4C4] w-[310px] h-[52px] rounded-[1.25rem] text-[20px] my-[6px]" type={type} placeholder={pholder}/>
  )
}

export default InputLoginButton