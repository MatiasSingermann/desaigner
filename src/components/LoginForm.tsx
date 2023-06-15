import EmailLogo from "~/components/EmailLogo";
import GoogleButton from "~/components/GoogleButton";
import GoogleLogo from "~/components/GoogleLogo";
import EmailInput from "~/components/EmailInput";
import PasswordInput from "~/components/PasswordInput";
import PasswordLogo from "~/components/PasswordLogo";
import SignButton from "~/components/SignButton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";

// https://stackoverflow.com/questions/43137275/how-to-get-values-from-input-types-using-this-refs-in-reactjs

// https://javascript.plainenglish.io/how-to-get-html-form-values-with-javascript-b4869bc5e889

function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(formData.entries());

    let inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }

    let userEmail = inputData[0]![1];
    let userPassword = inputData[1]![1];

    if (typeof userEmail === "string" && typeof userPassword === "string") {
      let obj = {
        email: userEmail.toLocaleLowerCase(),
        contrasenia: userPassword,
      };
      fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.log("Hola");
          console.log(error);
        });
    }
  };

  return (
    <div className="flex h-[514px] w-[340px] md:h-[800px] md:w-[600px] items-center justify-center rounded-3xl bg-[#009E95] px-[12px] dark:bg-[#293433]">
      <form
        className="flex relative h-full flex-col items-center justify-center"
        action="/home"
        method="POST"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <h2 className="md:absolute mt-[20px] md:mt-[36px] h-[88px] w-[266px] md:h-auto md:w-auto text-center font-coolveticaRegular text-[35px] md:text-[50px] leading-none text-[#FBF9FA] md:top-0">
          Inicia sesión en DesAIgner
        </h2>
        <div className="mb-[36px] mt-[33px] flex flex-col items-center justify-center">
          <EmailInput
            icon={<EmailLogo />}
            pholder="Email"
            mlength={1}
            name="email"
          />
          <PasswordInput
            icon={<PasswordLogo />}
            pholder="Contraseña"
            mlength={9}
            name="passw"
          />
          <SignButton type="submit" text="Inicia sesión" />
          <button className="mt-[8px] font-coolveticaBook text-[#FBF9FA] underline hover:text-[#E8E8E8]">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="mb-[22px] flex flex-row items-center justify-center">
          <hr className="mr-2 w-[136px] border-[#FBF9FA]" />
          <p className="pb-1 text-center text-[20px] text-[#FBF9FA]">o</p>
          <hr className="ml-2 w-[136px] border-[#FBF9FA]" />
        </div>
        <GoogleButton icon={<GoogleLogo />} text="Inicia sesión con Google" />
      </form>
      <ToastContainer limit={3} />
    </div>
  );
}

export default LoginForm;
