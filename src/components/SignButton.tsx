interface SignButtonProps {
    type?: 'submit' | 'reset' | 'button';
    text: string
}  

function SignButton({type, text} : SignButtonProps) {
  return (
    <button className="bg-[#59C3C3] shadow-xl text-white text-[24px] rounded-3xl w-[192px] h-[38px] mt-[9px] font-coolveticaRegular" type={type}>{text}</button>
  )
}

export default SignButton