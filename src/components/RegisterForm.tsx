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

function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }
    
    const userEmail = inputData[0]?inputData[0][1]:"";
    const userPassword = inputData[1]?inputData[1][1]:"";
    const userRepeatPassword = inputData[2]?inputData[2][1]:"";

    if (
      typeof userEmail === "string" &&
      typeof userPassword === "string" &&
      typeof userRepeatPassword === "string"
    ) {
      const emptyInput =
        userEmail === "" || userPassword === "" || userRepeatPassword === "";
      const forbiddenChars =
        !/[A-Za-z0-9#_@$!%*?&]/.test(userEmail) ||
        !/[A-Za-z0-9#_@$!%*?&]/.test(userPassword) ||
        !/[A-Za-z0-9#_@$!%*?&]/.test(userRepeatPassword);
      const noValidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
      const notEqualPassword = userPassword !== userRepeatPassword;
      const minusMinLenPassword =
        userPassword.length < 8 || userRepeatPassword.length < 8;
      const hasNoSpecialChar =
        !/[#_@$!%*?&]/.test(userPassword) ||
        !/[#_@$!%*?&]/.test(userRepeatPassword); // /[!@$%&#]/
      const hasNoUpperCase =
        userPassword.match(/[A-Z]/) == null ||
        userRepeatPassword.match(/[A-Z]/) == null;
      const hasNoSpace =
        userPassword.includes(" ") || userRepeatPassword.includes(" ");

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
      } else if (notEqualPassword) {
        console.log("La contraseña debe ser igual en ambos inputs");
        toast.error("La contraseña debe ser igual en ambos inputs", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (minusMinLenPassword) {
        console.log("La contraseña debe tener al menos 8 caracteres");
        toast.error("La contraseña debe tener al menos 8 caracteres", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (hasNoSpecialChar) {
        console.log(
          "La contraseña debe tener como mínimo 1 caracter especial (#,_,@,$,!,%,*,?,&)"
        );
        toast.error(
          "La contraseña debe tener como mínimo 1 caracter especial (#,_,@,$,!,%,*,?,&)",
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
      } else if (hasNoUpperCase) {
        console.log(
          "La contraseña debe tener al menos un caracter en mayúscula"
        );
        toast.error(
          "La contraseña debe tener al menos un caracter en mayúscula",
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
      } else if (hasNoSpace) {
        console.log("La contraseña no debe contener espacios");
        toast.error("La contraseña no debe contener espacios", {
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
        const obj = {
          email: userEmail.toLocaleLowerCase(),
          contrasenia: userPassword,
        };
        fetch("api/auth/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => {
            if (response.ok) {
              toast.success("¡Te has registrado exitosamente!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else if (response.status == 409) {
              console.log("Ya existe una cuenta con este email");
              toast.error("Ya existe una cuenta con este email", {
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
          })
          .catch((error) => {
            console.log(
              "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde"
            );
            console.log(error);
            toast.error(
              "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde",
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
          });
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
        <h2 className="relative top-0 mb-[24px] mt-[28px] text-center font-coolveticaRegular text-[35px] leading-none text-[#FBF9FA] 480:text-[38.5px] 480:mb-[28px]">
          Regístrate en DesAIgner
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
          <PasswordInput
            icon={<PasswordLogo />}
            pholder="Repetir contraseña"
            mlength={9}
            name="repeatPassw"
          />
          <SignButton type="submit" text="Regístrate" />
        </div>
        <div className="mb-[16px] flex flex-row items-center justify-center">
          <hr className="mr-2 w-[136px] border-[#FBF9FA]" />
          <p className="pb-1 text-center text-[20px] text-[#FBF9FA] 480:text-[22px]">o</p>
          <hr className="ml-2 w-[136px] border-[#FBF9FA]" />
        </div>
        <GoogleButton icon={<GoogleLogo />} text="Registrarse con Google" />
      </form>
      <ToastContainer limit={3} />
    </div>
  );
}

export default RegisterForm;
