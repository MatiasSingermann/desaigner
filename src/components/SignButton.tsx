interface SignButtonProps {
    type?: 'submit' | 'reset' | 'button';
    text: string
}

function SignButton({type, text} : SignButtonProps) {
  return (
    <button className="bg-[#59C3C3] hover:bg-[#20A1A1] shadow-xl text-white text-[24px] 480:text-[26.5px] rounded-3xl w-[192px] h-[38px] 480:w-[212px] 480:h-[42px] mt-[8px] font-coolveticaRegular 480:mt-[12px]" type={type}>{text}</button>
  )
}

export default SignButton