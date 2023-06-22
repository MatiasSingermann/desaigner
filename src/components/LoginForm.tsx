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

import { useRouter } from 'next/router'

function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter()

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
      let emptyInput = userEmail === "" || userPassword === "";
      let forbiddenChars =
        !/[A-Za-z0-9#_@$!%*?&]/.test(userEmail) ||
        !/[A-Za-z0-9#_@$!%*?&]/.test(userPassword);
      let noValidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

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
          .then((response) => {
            if (response.ok) {
              console.log("Inicio de sesión exitoso");
            }
          })
          .then((data) => console.log(data))
          .catch((error) => {
            console.log("Hubo un error en el login");
            console.log(error);
          });
          toast.success(
            "¡Has iniciado sesión exitosamente!",
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
          router.push('/home')
      }
    }
  };

  return (
    <div className="flex h-[514px] w-[340px] items-center justify-center rounded-3xl bg-[#009E95] px-[12px] dark:bg-[#293433]">
      <form
        className="flex flex-col items-center justify-center"
        action="/home"
        method="POST"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <h2 className="mt-[20px] h-[88px] w-[266px] text-center font-coolveticaRegular text-[35px] leading-none text-[#FBF9FA]">
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
