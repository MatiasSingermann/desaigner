import Cross from "./Cross";
import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import PasswordInput from "./PasswordInput";
import PasswordLogo from "~/components/PasswordLogo";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AcceptDeletionProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showEdit: SetStateAction<boolean>;
}

function AcceptDeletion({ setShowEdit, showEdit }: AcceptDeletionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const deleteAccount = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }

    const userPassword = inputData[0]?inputData[0][1]:"";
    const obj = {
      contrasenia: userPassword,
    };
    fetch("api/auth/deleteUsuario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Su cuenta ha sido borrada con éxito");
          toast.success("Su cuenta ha sido borrada con éxito", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          void signOut();
          void router.push("/landing");
        }
      })
      .catch((error) => {
        console.log(
          "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde"
        );
        console.log(error);
        toast.error("Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setShowEdit(false);
  };
  const handleClick = () => {
    setShowEdit(false);
  };
  return (
    <div
      className={`top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${
        showEdit ? "fixed " : "hidden"
      }`}
    >
      <div className="relative flex h-[300px] w-[324px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px]">
        <button
          onClick={handleClick}
          className="absolute right-0 top-0 m-[12px] flex"
          form="false"
        >
          <Cross />
        </button>
        <h1 className="mt-[40px] text-center font-coolveticaRegular text-[30px] leading-none text-[#FBF9FA]">
          Ingrese su contraseña para borrar
        </h1>
        <form
          className="flex mt-[40px] h-fit flex-col items-center justify-center"
          action="/home"
          method="POST"
          onSubmit={deleteAccount}
          ref={formRef}
          noValidate
        >
          <PasswordInput
            icon={<PasswordLogo />}
            pholder="Contraseña"
            mlength={9}
            name="passw"
          />
          <button type="submit" className="absolute bottom-0 mb-[38px] flex h-[36px] w-[130px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]">
            Borrar cuenta
          </button>
        </form>
      </div>
      <input
        type="text"
        name="maskImage"
        className="hidden"
        readOnly={true}
        value="TEST"
      />
      <ToastContainer limit={3} />
    </div>
  );
}

export default AcceptDeletion;
