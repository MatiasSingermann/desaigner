import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import Image from "next/image";
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
  const [finished, setFinished] = useState(false);
  const [moreThan1, setMoreThan1] = useState(false);
  const [result, setResult] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [imageURL1, setImageURL1] = useState("");
  const [imageURL2, setImageURL2] = useState("");
  const [imageURL3, setImageURL3] = useState("");
  const [imageURL4, setImageURL4] = useState("");

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
    const imageProssesor = (data : any, imgs : any) => {
      console.log(data);
      setLoading(false);
      imgs = data.images;
      console.log("LENGTH: " + imgs.length);
      if (imgs.length > 1) {
        const finalImage1 = imgs[0];
        const finalImage2 = imgs[1];
        const finalImageByteArray1 = base64.toByteArray(finalImage1);
        const finalImageByteArray2 = base64.toByteArray(finalImage2);
        const blob1 = new Blob([finalImageByteArray1], {
          type: "image/jpeg",
        });
        const blob2 = new Blob([finalImageByteArray2], {
          type: "image/jpeg",
        });
        setImageURL1(URL.createObjectURL(blob1));
        setImageURL2(URL.createObjectURL(blob2));
        if (imgs.length > 2) {
          const finalImage3 = imgs[2];
          const finalImageByteArray3 = base64.toByteArray(finalImage3);
          const blob3 = new Blob([finalImageByteArray3], {
            type: "image/jpeg",
          });
          setImageURL3(URL.createObjectURL(blob3));
        }
        if (imgs.length > 3) {
          const finalImage4 = imgs[3];
          const finalImageByteArray4 = base64.toByteArray(finalImage4);
          const blob4 = new Blob([finalImageByteArray4], {
            type: "image/jpeg",
          });
          setImageURL4(URL.createObjectURL(blob4));
        }
        setMoreThan1(true);
        setFinished(true);
      } else {
        const finalImage = imgs[0];
        const finalImageByteArray = base64.toByteArray(finalImage);
        const blob = new Blob([finalImageByteArray], {
          type: "image/jpeg",
        });
        setImageURL(URL.createObjectURL(blob));
        setResult(true);
        setFinished(true);
      }
    }
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

      var imgs : any;

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

        const obj = {
          budget: budget,
          style: style,
          environment: environment,
          weather: weather,
          disability: disability,
          num_images: numImages,
          steps: 1,
          guidance_scale: 7,
        };

        console.log("NO IMG");

        setLoading(true);

        fetch("http://localhost:8000/txt2img/v2/v1", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => {
            imageProssesor(data, imgs);
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
      } else if (requiredInputs && !isNoImage && isNoMask) {
        // && !isNoNumber) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = new Uint8Array(reader.result as ArrayBuffer);
          const base64Data = base64.fromByteArray(imageData);

          const obj = {
            input_image: base64Data,
            budget: budget,
            style: style,
            environment: environment,
            weather: weather,
            disability: disability,
            num_images: numImages,
            steps: 20,
            guidance_scale: 7,
          };

          console.log("IMG NO MASK");

          setLoading(true);

          fetch("http://localhost:8000/img2img/v2", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
              setFinished(true);
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
            input_image: base64Data,
            no_image: noImage,
            budget: budget,
            style: style,
            environment: environment,
            weather: weather,
            disability: disability,
            num_images: numImages,
            mask_image: maskImage,
            steps: 20,
            guidance_scale: 7,
          };

          console.log("ALL");

          setLoading(true);

          fetch("http://localhost:8000/inpaint/v2", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
              setFinished(true);
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
          {finished ? null : (
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
          )}
          {moreThan1 ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="mx-[32px] mb-[52px] self-start bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text font-coolveticaRegular text-[40px] leading-none text-transparent">
                Listo
              </h1>
              <h2 className="mx-[32px] self-start font-coolveticaRegular text-[30px] leading-none">
                Elige la imagen con la que te quieras quedar
              </h2>
              <div className="relative mb-[110px] mt-[30px] flex h-[180px] w-[330px] flex-col">
                <Image
                  src={imageURL1}
                  alt="image"
                  width={500}
                  height={300}
                  className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
                ></Image>
              </div>
              <div className="relative mb-[110px] mt-[30px] flex h-[180px] w-[330px] flex-col">
                <Image
                  src={imageURL2}
                  alt="image"
                  width={500}
                  height={300}
                  className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
                ></Image>
              </div>
              {imageURL3 ? (
                <div className="relative mb-[110px] mt-[30px] flex h-[180px] w-[330px] flex-col">
                  <Image
                    src={imageURL3}
                    alt="image"
                    width={500}
                    height={300}
                    className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
                  ></Image>
                </div>
              ) : null}
              {imageURL4 ? (
                <div className="relative mb-[110px] mt-[30px] flex h-[180px] w-[330px] flex-col">
                  <Image
                    src={imageURL4}
                    alt="image"
                    width={500}
                    height={300}
                    className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
                  ></Image>
                </div>
              ) : null}
            </div>
          ) : null}
          {result ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="mx-[32px] mb-[52px] self-start bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text font-coolveticaRegular text-[40px] leading-none text-transparent">
                Aquí tienes tu imagen
              </h1>
              <h2 className="mx-[32px] self-start font-coolveticaRegular text-[30px] leading-none">
                Puedes ver los links de los muebles
              </h2>
              <div className="relative mb-[110px] mt-[30px] flex h-[180px] w-[330px] flex-col">
                <Image
                  src={imageURL}
                  alt="image"
                  width={500}
                  height={300}
                  className="absolute flex h-full w-full items-center justify-center rounded-xl object-cover"
                ></Image>
              </div>
            </div>
          ) : null}
          <ToastContainer limit={3} />
        </main>
        <Footer />
      </>
    );
  }
}

export default index;
