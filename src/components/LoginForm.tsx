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
import { signIn } from "next-auth/react";

function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(formData.entries());

    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }

    const userEmail = inputData[0]?inputData[0][1]:"";
    const userPassword = inputData[1]?inputData[1][1]:"";

    if (typeof userEmail === "string" && typeof userPassword === "string") {
      const emptyInput = userEmail === "" || userPassword === "";
      const forbiddenChars =
        !/[A-Za-z0-9#_@$!%*?&]/.test(userEmail) ||
        !/[A-Za-z0-9#_@$!%*?&]/.test(userPassword);
      const noValidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

      if (emptyInput) {
        console.log("Hay uno o más inputs vacíos");
        toast.error("Hay uno o más inputs vacíos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (forbiddenChars) {
        console.log(
          "Sólo puedes usar números, letras y los siguientes símbolos: #, _, @, $, !, %, *, ? y &"
        );
        toast.error(
          "Sólo puedes usar números, letras y los siguientes símbolos: #, _, @, $, !, %, *, ? y &",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else if (noValidEmail) {
        console.log("El Email no es válido");
        toast.error("El Email no es válido", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const result = await signIn("credentials", {
          email: userEmail.toLocaleLowerCase(),
          contrasenia: userPassword,
          redirect: false,
          // callbackUrl: "/home",
        });
        if (result!.ok) {
          console.log("Inicio de sesión exitoso");
        } else if (result!.status !== 200) {
          console.log("Ese email o la contraseña son incorrectos");
          toast.error("Ese email o la contraseña son incorrectos", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    }
  };

  return (
    <div className="relative flex h-[514px] w-[340px] flex-col items-center justify-center rounded-3xl bg-[#009E95] px-[12px] dark:bg-[#292F2D] 480:h-[566px] 480:w-[374px] 720:h-[566px] 720:w-[374px] 1080:h-[566px] 1080:w-[374px]">
      <form
        className="flex h-fit flex-col items-center justify-center"
        action="/home"
        method="POST"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <h2 className="relative top-0 mb-[58px] mt-[28px] text-center font-coolveticaRegular text-[35px] leading-none text-[#FBF9FA] 480:text-[38.5px] 480:mb-[70px]">
          Inicia sesión en DesAIgner
        </h2>
        <div className="mb-[26px] flex flex-col items-center justify-center 480:mb-[32px]">
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
          <button form="false" className="mt-[8px] font-coolveticaBook text-[15px] text-[#FBF9FA] underline hover:text-[#E8E8E8] 480:text-[16.5px]">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="mb-[16px] flex flex-row items-center justify-center">
          <hr className="mr-2 w-[136px] border-[#FBF9FA]" />
          <p className="pb-1 text-center text-[20px] text-[#FBF9FA] 480:text-[22px]">o</p>
          <hr className="ml-2 w-[136px] border-[#FBF9FA]" />
        </div>
        <GoogleButton icon={<GoogleLogo />} text="Inicia sesión con Google" />
      </form>
      <ToastContainer limit={3} />
    </div>
  );
}

export default LoginForm;
