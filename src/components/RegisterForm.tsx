import EmailLogo from "~/components/EmailLogo";
import GoogleButton from "~/components/GoogleButton";
import GoogleLogo from "~/components/GoogleLogo";
import InputLoginButton from "~/components/InputLoginButton";
import PasswordLogo from "~/components/PasswordLogo";
import SignButton from "~/components/SignButton";

import { useRef } from 'react';

// https://stackoverflow.com/questions/43137275/how-to-get-values-from-input-types-using-this-refs-in-reactjs


function RegisterForm() {
    
    const formRef = useRef(null);

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();

        //formRef.current.
    }

  return (
    <form
      className="flex h-[568px] w-[336px] flex-col items-center justify-center"
      action="/home"
      method="POST"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h2 className="h-[88px] w-[266px] text-center font-coolveticaRegular text-[35px] leading-none text-white">
        Regístrate en DesAIgner
      </h2>
      <div className="mb-[52px] mt-[33px] flex flex-col items-center justify-center">
        <InputLoginButton
          icon={<EmailLogo />}
          type="email"
          pholder="Email"
          mlength={1}
        />
        <InputLoginButton
          icon={<PasswordLogo />}
          type="password"
          pholder="Contraseña"
          mlength={9}
        />
        <InputLoginButton
          icon={<PasswordLogo />}
          type="password"
          pholder="Repetir contraseña"
          mlength={9}
        />
        <SignButton type="submit" text="Regístrate" />
      </div>
      <div className="mb-[30px] flex flex-row items-center justify-center">
        <hr className="mr-2 w-[136px] border-white" />
        <p className="pb-1 text-center text-[20px] text-white">o</p>
        <hr className="ml-2 w-[136px] border-white" />
      </div>
      <GoogleButton icon={<GoogleLogo />} text="Registrarse con Google" />
    </form>
  );
}

export default RegisterForm;
