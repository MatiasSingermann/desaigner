interface SignButtonProps {
    type?: 'submit' | 'reset' | 'button';
    text: string
}

function SignButton({type, text} : SignButtonProps) {
  return (
    <button className="bg-[#59C3C3] hover:bg-[#20A1A1] shadow-xl text-white text-[24px] rounded-3xl w-[192px] h-[38px] mt-[8px] font-coolveticaRegular" type={type}>{text}</button>
  )
}

export default SignButton