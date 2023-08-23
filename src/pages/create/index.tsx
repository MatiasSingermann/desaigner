import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import { useState } from "react";
import base64 from "base64-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";
import InpaintingEditor from "~/components/InpaintingEditor";
import ResLoad from "~/components/ResLoad";

function index() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const formData = new FormData(e.currentTarget);
      const inputData = [];
      for (const pair of formData.entries()) {
        inputData.push(pair);
      }

      const inputImage: any = inputData[0] ? inputData[0][1] : "";
      let noImage = inputData[1] ? inputData[1][1].toString() : "";
      const budget = inputData[2] ? inputData[2][1].toString() : "";
      const style = inputData[3] ? inputData[3][1].toString() : "";
      const environment = inputData[4] ? inputData[4][1].toString() : "";
      const weather = inputData[5] ? inputData[5][1].toString() : "";
      const disability = inputData[6] ? inputData[6][1].toString() : "";
      const numImages = inputData[7] ? Number(inputData[7][1]) : "";
      const maskImage = inputData[8] ? inputData[8][1] : "";

      let requiredInputs = true;
      let isNoImage = false;
      let isNoMask = false;
      let isNoNumber = false;

      console.log("BUDGET: " + budget);

      if (
        budget == "" ||
        style == "" ||
        environment == "" ||
        weather == "" ||
        disability == ""
      ) {
        toast.error("Faltan llenar campos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        requiredInputs = false;
      }

      if (noImage == "true") {
        isNoImage = true;
      }

      // if (inputImage == "[object File]" || noImage == "false") {
      //   noImage = "true";
      // }

      if (maskImage == "TEST") {
        isNoMask = true;
      }

      if (typeof numImages != typeof 1) {
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
        isNoNumber = true;
      }

      console.log("inputData: " + inputData);

      if (requiredInputs && isNoImage) {
        //&& !isNoNumber) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer);
          const base64Data = base64.fromByteArray(imageData);

          const obj = {
            "budget": budget,
            "style": style,
            "environment": environment,
            "weather": weather,
            "disability": disability,
            "num_images": numImages,
            "steps": 20,
            "guidance_scale": 7,
          };

          console.log("NO IMG");

          setLoading(true);

          fetch("http://localhost:8000/txt2img/v2/v1", {
            mode: "no-cors",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => {
              setLoading(false);
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
              setLoading(false);
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
        reader.readAsArrayBuffer(inputImage);
      } else if (requiredInputs && !isNoImage && isNoMask) {
        // && !isNoNumber) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer);
          const base64Data = base64.fromByteArray(imageData);

          const obj = {
            "input_image": base64Data,
            "budget": budget,
            "style": style,
            "environment": environment,
            "weather": weather,
            "disability": disability,
            "num_images": numImages,
            "steps": 20,
            "guidance_scale": 7,
          };

          console.log("IMG NO MASK");

          fetch("http://localhost:8000/img2img/v2", {
            mode: "no-cors",
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
        reader.readAsArrayBuffer(inputImage);
      } else if (requiredInputs && !isNoImage && !isNoMask) {
        // && !isNoNumber) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer);
          const base64Data = base64.fromByteArray(imageData);

          const obj = {
            "input_image": base64Data,
            "no_image": noImage,
            "budget": budget,
            "style": style,
            "environment": environment,
            "weather": weather,
            "disability": disability,
            "num_images": numImages,
            "mask_image": maskImage,
            "steps": 20,
            "guidance_scale": 7,
          };

          console.log("ALL");

          fetch("http://localhost:8000/inpaint/v2", {
            mode: "no-cors",
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
          {loading && <ResLoad />}
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
