import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import { useState } from "react";
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
      console.log(formData.entries());
      const inputData = [];
      for (const pair of formData.entries()) {
        inputData.push(pair);
      }

      console.log(inputData)

      const inputImage : any = inputData[0] ? inputData[0][1] : "";

      const inputImageBase64 = fromByteArray(new Uint8Array(inputImage))
      const maskImage = "mask";
      const budget = inputData[1] ? inputData[1][1] : "";
      const style = inputData[2] ? inputData[2][1] : "";
      const environment = inputData[3] ? inputData[3][1] : "";
      const weather = inputData[4] ? inputData[4][1] : "";
      const disability = inputData[5] ? inputData[5][1] : "";
      const numImages = inputData[6] ? inputData[6][1] : "";

      console.log("1: " + inputImageBase64);
      console.log("2: " + maskImage);
      console.log("3: " + String(budget));
      console.log("4: " + style);
      console.log("5: " + environment);
      console.log("6: " + weather);
      console.log("7: " + disability);
      console.log("8: " + numImages);

      console.log(inputImage)

      if(inputImageBase64 === ""){
        console.log("F")
      }

      const obj = {
        input_image: inputImageBase64,
        // mask_image: maskImage;
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
            {showEdit ? <InpaintingEditor setShowEdit={setShowEdit} /> : null}
          </form>
          <ToastContainer limit={3} />
        </main>
        <Footer />
      </>
    );
  }
}

export default index;
