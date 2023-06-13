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

function RegisterForm() {
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
    let userRepeatPassword = inputData[2]![1];

    if (
      typeof userEmail === "string" &&
      typeof userPassword === "string" &&
      typeof userRepeatPassword === "string"
    ) {
      let equalPassword = userPassword !== userRepeatPassword;
      let minusMinLenPassword = (userPassword.length < 9) || (userRepeatPassword.length < 9);
      let hasSpecialChar = (!/[#_@$!%*?&]/.test(userPassword)) || (!/[#_@$!%*?&]/.test(userRepeatPassword)); // /[!@$%&#]/
      let hasUpperCase = (userPassword.match(/[A-Z]/) == null) || (userRepeatPassword.match(/[A-Z]/) == null);
      let hasSpace = (userPassword.includes(" ")) || (userRepeatPassword.includes(" "));

      if (equalPassword) {
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
      }
      if (minusMinLenPassword) {
        console.log("La contraseña debe tener al menos 9 caracteres");
        toast.error("La contraseña debe tener al menos 9 caracteres", {
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
      if (hasSpecialChar) {
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
      }
      if (hasUpperCase) {
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
      }
      if (hasSpace) {
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
        let obj = {
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
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => {
            console.log("Hola");
            console.log(error);
          });
        // fetch('/api/hola')
        //   .then(response => response.json())
        //   .then(data => console.log(data));
      }
    }
  };

  return (
    <>
      <form
        className="flex h-[568px] w-[336px] flex-col items-center justify-center"
        action="/home"
        method="POST"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <h2 className="h-[88px] w-[266px] text-center font-coolveticaRegular text-[35px] leading-none text-white">
          Regístrate en DesAIgner
        </h2>
        <div className="mb-[52px] mt-[33px] flex flex-col items-center justify-center">
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
        <div className="mb-[30px] flex flex-row items-center justify-center">
          <hr className="mr-2 w-[136px] border-white" />
          <p className="pb-1 text-center text-[20px] text-white">o</p>
          <hr className="ml-2 w-[136px] border-white" />
        </div>
        <GoogleButton icon={<GoogleLogo />} text="Registrarse con Google" />
      </form>
      <ToastContainer />
    </>
  );
}

export default RegisterForm;
