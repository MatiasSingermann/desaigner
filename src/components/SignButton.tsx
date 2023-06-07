interface SignButtonProps {
    type?: 'submit' | 'reset' | 'button';
    text: string
}  

const handleSignClick = () => {
  let obj = {
    // email: InputLoginButton.value,
    // password: InputLoginButton.value
  }
  // fetch("/api", {
  //   method: "POST",
  //   headers: {
  //     "Content-type":"application/json"
  //   },
  //   body:JSON.stringify(obj)
  // })
  console.log("handleSignClick");
}

function SignButton({type, text} : SignButtonProps) {
  return (
    <button className="bg-[#59C3C3] shadow-xl text-white text-[24px] rounded-3xl w-[192px] h-[38px] mt-[9px] font-coolveticaRegular" type={type} onClick={handleSignClick}>{text}</button>
  )
}

export default SignButton