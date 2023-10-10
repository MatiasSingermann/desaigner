import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import Image from "next/image";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";
import InpaintingEditor from "~/components/InpaintingEditor";
import ResLoad from "~/components/ResLoad";
import SwiperResultShow from "~/components/SwiperResultShow";
import SaveImageButton from "~/components/SaveImageButton";
import SaveImageInfo from "~/components/SaveImageInfo";

import { motion } from "framer-motion";
import useImageData from "~/hooks/useImageData";
import type { dataImage, FullDataImage } from "~/hooks/useImageData";
import { LinkList } from "~/components/createComps/LinkList";

const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 0.4 },
  variants: {
    visible: { opacity: 1, scale: 1, translateY: 0 },
    hidden: { opacity: 0, scale: 1, translateY: 22 },
  },
};

function Index() {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [moreThan1, setMoreThan1] = useState(false);
  const [result, setResult] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageButtonClick, setImageButtonClick] = useState(false);

  const { imageFullData, setImageFullData, images, imageProcessor } =
    useImageData(setLoading, setFinished);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY!.toString();

  const { status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "unauthenticated") {
    void router.push("/login");
  }

  if (status === "authenticated") {
    const handleSaveImage = () => {
      setImageButtonClick(!imageButtonClick);
      // const obj = {
      //   nombre: "", // string
      //   ambiente: "", // string
      //   presupuesto: "", // string
      //   estilo: "", // string
      //   colecciones: "", // string[]
      //   disenioIMG: "", // string (base64)
      //   muebles: "", // object[] todo lo que me devuelve blanco
      // }
    };

    const getLinks = (blob: Blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      fetch("http://localhost:9000/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data: FullDataImage) => {
          setImageFullData(data);
          setMoreThan1(false);
          setResult(true);
          setLoading(false);
        })
        .catch((error: Error) => {
          imageError(error);
        });
    };

    const imageError = (error: Error) => {
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
    };

    const handleImageSelect = () => {
      getLinks(images[selectedImage]!.blob);
      setLoading(true);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const inputData = [];
      for (const pair of formData.entries()) {
        inputData.push(pair);
      }

      const inputImage = inputData[0] ? inputData[0][1] : "";
      const noImage = inputData[1] ? inputData[1][1].toString() : "";
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

      if (maskImage == "TEST") {
        isNoMask = true;
      }

      if (requiredInputs && isNoImage) {
        const obj = {
          budget: budget,
          style: style,
          environment: environment,
          weather: weather,
          disability: disability,
          num_images: numImages,
          steps: 20,
          guidance_scale: 7,
        };

        console.log("NO IMG");

        setLoading(true);

        fetch("http://localhost:8000/txt2img/v2/v1", {
          // http://localhost:8000/txt2img/v3
          method: "POST",
          headers: {
            accept: "application/json",
            "x-api-key": apiKey,
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data: dataImage) => {
            console.log(data);
            imageProcessor(data);
          })
          .catch((error: Error) => {
            imageError(error);
          });
      } else if (requiredInputs && !isNoImage && isNoMask) {
        console.log("IMG NO MASK");

        setLoading(true);

        const formData = new FormData();

        formData.append("budget", budget);
        formData.append("style", style);
        formData.append("environment", environment);
        formData.append("weather", weather);
        formData.append("disability", disability);
        formData.append("num_images", numImages.toString());
        formData.append("steps", (20).toString());
        formData.append("guidance_scale", (7).toString());
        formData.append("controlnet_conditioning_scale", (1).toString());
        formData.append("input_image", inputImage);

        fetch("http://localhost:8000/img2img/v3", {
          method: "POST",
          headers: { "x-api-key": apiKey },
          body: formData,
        })
          .then((response) => response.json())
          .then((data: dataImage) => {
            imageProcessor(data);
          })
          .catch((error: Error) => {
            imageError(error);
          });
      } else if (requiredInputs && !isNoImage && !isNoMask) {
        console.log("ALL");

        setLoading(true);

        const formData = new FormData();

        formData.append("budget", budget);
        formData.append("style", style);
        formData.append("environment", environment);
        formData.append("weather", weather);
        formData.append("disability", disability);
        formData.append("num_images", numImages.toString());
        formData.append("steps", (1).toString());
        formData.append("guidance_scale", (7).toString());
        formData.append("controlnet_conditioning_scale", (1).toString());
        formData.append("input_image", inputImage);
        formData.append("mask_image", maskImage);

        fetch("http://localhost:8000/inpaint/v3", {
          method: "POST",
          headers: { "x-api-key": apiKey },
          body: formData,
        })
          .then((response) => response.json())
          .then((data: dataImage) => {
            imageProcessor(data);
          })
          .catch((error: Error) => {
            imageError(error);
          });
      }
    };
    return (
      <>
        <Head>
          <title>Create</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
          {loading && <ResLoad />}
          {finished ? null : (
            <motion.form
              {...motionProps}
              action=""
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              ref={formRef}
              className="flex w-full flex-col items-center justify-center"
            >
              <StepShow setShowEdit={setShowEdit} />
              <InpaintingEditor setShowEdit={setShowEdit} showEdit={showEdit} />
            </motion.form>
          )}
          {moreThan1 ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="mx-[32px] mb-[30px] self-start font-coolveticaRegular text-[30px] leading-none">
                <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
                  Listo!&#160;
                </span>
                <span className="text-[#22302D] dark:text-[#FBF9FA]">
                  Aquí están tus diseños
                </span>
              </h1>
              <h2 className="mx-[32px] self-start font-coolveticaBook text-[20px] leading-none">
                Elige el que más te guste
              </h2>
              <SwiperResultShow
                imageURL1={images[0]!.url}
                imageURL2={images[1]!.url}
                imageURL3={images[2]!.url}
                imageURL4={images[3]!.url}
                setSelectedImage={setSelectedImage}
              />
              <button
                onClick={handleImageSelect}
                className="mb-[130px] flex h-[40px] w-[120px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#59C3C3] to-[#228187] font-coolveticaRegular text-[20px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
              >
                Elegir
              </button>
            </div>
          ) : null}
          {result ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="mx-[32px] mb-[30px] self-start font-coolveticaRegular text-[30px] leading-none text-[#22302D] dark:text-[#FBF9FA]">
                Basado en la imagen, encontramos estos muebles
              </h1>
              <h2 className="mx-[32px] self-start font-coolveticaBook text-[20px] leading-none">
                Clickea los links debajo de la imagen para ir a los artículos
              </h2>

              <Image
                src={images[0]!.url}
                alt="image"
                width={300}
                height={200}
                className="relative mx-[32px] my-[32px] flex h-[290px] w-[290px] items-center justify-center rounded-xl object-contain shadow-md shadow-[#999] dark:shadow-[#111]"
              ></Image>

              <div className="relative flex h-[300px] w-[300px] flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-2xl border-[2px] border-[#BABABA] bg-[#E8E8E8] dark:border-none dark:bg-[#293433]">
                <div className="absolute top-0 flex w-full flex-col">
                  <LinkList data={imageFullData} />
                </div>
              </div>
              <SaveImageButton handleSaveImage={handleSaveImage} />
              {imageButtonClick && (
                <SaveImageInfo
                  environment=""
                  budget=""
                  style=""
                  image=""
                  furniture={["", ""]}
                />
              )}
            </div>
          ) : null}
          <ToastContainer limit={3} />
        </main>
        <Footer />
      </>
    );
  }
}

export default Index;
