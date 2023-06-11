import { useState } from 'react'

function LoginSwitch() {

    const [login, setLogin] = useState(true)

    const handleSwitch = () => {
        setLogin(!login)
        console.log(login)
    }

  return (
    <div className="flex fixed justify-center items-center bottom-[245px]">
        <div className="flex relative items-center w-[116px] h-[26px] bg-[#59C3C3] border-[3px] border-[#FBF9FA] shadow-lg rounded-3xl px-[8px]">
            <button className={`flex relative justify-center items-center ${login ? "left-0" : "right-0"} w-[46px] h-[46px] bg-[#228187] border-[3px] border-[#FBF9FA] shadow-lg rounded-3xl transition-all`} onClick={handleSwitch}></button>
        </div>
    </div>
  )
}

export default LoginSwitch