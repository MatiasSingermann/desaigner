import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import { useState } from "react";
import base64 from 'base64-js';
import { fromByteArray } from 'base64-js';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";
import InpaintingEditor from "~/components/InpaintingEditor";

function index() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showEdit, setShowEdit] = useState(false);

  const { data: session, status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated") {
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(e.currentTarget);
      const formData = new FormData(e.currentTarget);
      const inputData = [];
      for (const pair of formData.entries()) {
        console.log(pair);
        inputData.push(pair);
      }

      const inputImage : any = inputData[0] ? inputData[0][1] : "";
      const noImage = inputData[1] ? inputData[1][1] : "";
      const budget = inputData[2] ? inputData[2][1] : "";
      const style = inputData[3] ? inputData[3][1] : "";
      const environment = inputData[4] ? inputData[4][1] : "";
      const weather = inputData[5] ? inputData[5][1] : "";
      const disability = inputData[6] ? inputData[6][1] : "";
      const numImages = inputData[7] ? inputData[7][1] : "";
      const maskImage = inputData[8] ? inputData[8][1] : "";

      let requiredInputs = true
      let isNoImage = false
      let isNoMask = false

      if(!budget && !style && !environment && !weather && !disability){
        toast.error(
          "Faltan llenar campos",
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
        requiredInputs = false;
      }

      if(!inputImage){
        isNoImage = true;
      }

      if(!maskImage){
        isNoMask = true;
      }

      console.log("inputData: " + inputData)

      if(requiredInputs && !isNoImage && isNoMask) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer)
          const base64Data = base64.fromByteArray(imageData)
    
          const obj = {
            input_image: base64Data,
            budget: budget,
            style: style,
            environment: environment,
            weather: weather,
            disability: disability,
            num_images: numImages,
          };
          
          fetch("localhost:8000/img2img/v2", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => {
              if (response.ok) {
                toast.success("¡Los datos han sido subidos exitosamente!", {
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
        reader.readAsArrayBuffer(inputImage);
      }

      if(requiredInputs && isNoImage) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer)
          const base64Data = base64.fromByteArray(imageData)
    
          const obj = {
            budget: budget,
            style: style,
            environment: environment,
            weather: weather,
            disability: disability,
            num_images: numImages,
          };
          
          fetch("localhost:8000/txt2img/v2/v1", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => {
              if (response.ok) {
                toast.success("¡Los datos han sido subidos exitosamente!", {
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
        reader.readAsArrayBuffer(inputImage);
      }

      if(requiredInputs && !isNoImage && !isNoMask) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer)
          const base64Data = base64.fromByteArray(imageData)
    
          const obj = {
            input_image: base64Data,
            no_image: noImage,
            budget: budget,
            style: style,
            environment: environment,
            weather: weather,
            disability: disability,
            num_images: numImages,
            mask_image: maskImage,
          };
          
          fetch("localhost:8000/inpaint/v2", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => {
              if (response.ok) {
                toast.success("¡Los datos han sido subidos exitosamente!", {
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
        reader.readAsArrayBuffer(inputImage);
      }
    };
    return (
      <>
        <Head>
          <title>Create</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/DesAIgnerIco.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
          <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            ref={formRef}
            className="flex w-full flex-col items-center justify-center"
          >
            <StepShow setShowEdit={setShowEdit} />
            <InpaintingEditor setShowEdit={setShowEdit} showEdit={showEdit} />
          </form>
          <ToastContainer limit={3} />
        </main>
        <Footer />
      </>
    );
  }
}

export default index;
