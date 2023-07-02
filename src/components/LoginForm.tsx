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

import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
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
        const result = await signIn("credentials", {
          email: userEmail.toLocaleLowerCase(),
          contrasenia: userPassword,
          redirect: false,
          // callbackUrl: "/home",
        });
        if (result!.ok) {
          console.log("Inicio de sesión exitoso");
          router.push("/home");
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
        } // else if (result!.status == 401) {
        //console.log("La contraseña es incorrecta");
        // toast.error("La contraseña es incorrecta", {
        // position: "top-center",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
        // });
        // }
        // let obj = {
        //   email: userEmail.toLocaleLowerCase(),
        //   contrasenia: userPassword,
        // };
        // fetch("api/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify(obj),
        // })
        //   .then((response) => {
        //     if (response.ok) {
        //       console.log("Inicio de sesión exitoso");
        //       router.push("/home");
        //     } else if (response.status == 404) {
        //       console.log("Ese email no está registrado");
        //       toast.error("Ese email no está registrado", {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //       });
        //     } else if (response.status == 401) {
        //       console.log("La contraseña es incorrecta");
        //       toast.error("La contraseña es incorrecta", {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //       });
        //     }
        //   })
        //   .then((data) => console.log(data))
        //   .catch((error) => {
        //     console.log(
        //       "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde"
        //     );
        //     console.log(error);
        //     toast.error(
        //       "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde",
        //       {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //       }
        //     );
        //   });
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
          <button className="mt-[8px] font-coolveticaBook text-[15px] text-[#FBF9FA] underline hover:text-[#E8E8E8] 480:text-[16.5px]">
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
