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
import SwiperResultShow from "~/components/SwiperResultShow";

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
  const [selectedImage, setSelectedImage] = useState();
  const [blob1, setBlob1] = useState<Blob | null>(null);
  const [blob2, setBlob2] = useState<Blob | null>(null);
  const [blob3, setBlob3] = useState<Blob | null>(null);
  const [blob4, setBlob4] = useState<Blob | null>(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageLink1, setImageLink1] = useState("");
  const [imageLink2, setImageLink2] = useState("");
  const [imageLink3, setImageLink3] = useState("");

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
    const getLinks = (blob: Blob) => {
      const formData = new FormData();
      formData.append("data", blob);

      fetch("http://localhost:9000/", {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          "x-api-key": "lsakslaoañ209sk1",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImagePrompt(data.prompt);
          const imageLinks = data.links;
          setImageLink1(imageLinks[0]);
          setImageLink2(imageLinks[1]);
          setImageLink3(imageLinks[2]);
        })
        .catch((error) => {
          imageError(error);
        });
    };

    const imageError = (error: any) => {
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

    const imageProcessor = (data: any, imgs: any) => {
      console.log(data);
      setLoading(false);
      imgs = data.images;
      console.log("LENGTH: " + imgs.length);
      if (imgs.length > 1) {
        const finalImage1 = imgs[0];
        const finalImage2 = imgs[1];
        const finalImageByteArray1 = base64.toByteArray(finalImage1);
        const finalImageByteArray2 = base64.toByteArray(finalImage2);
        const myBlob1 = new Blob([finalImageByteArray1], {
          type: "image/jpeg",
        });
        setBlob1(myBlob1);
        const myBlob2 = new Blob([finalImageByteArray2], {
          type: "image/jpeg",
        });
        setBlob2(myBlob2);
        setImageURL1(URL.createObjectURL(myBlob1));
        setImageURL2(URL.createObjectURL(myBlob2));
        if (imgs.length > 2) {
          const finalImage3 = imgs[2];
          const finalImageByteArray3 = base64.toByteArray(finalImage3);
          const myBlob3 = new Blob([finalImageByteArray3], {
            type: "image/jpeg",
          });
          setBlob3(myBlob3);
          setImageURL3(URL.createObjectURL(myBlob3));
        }
        if (imgs.length > 3) {
          const finalImage4 = imgs[3];
          const finalImageByteArray4 = base64.toByteArray(finalImage4);
          const myBlob4 = new Blob([finalImageByteArray4], {
            type: "image/jpeg",
          });
          setBlob4(myBlob4);
          setImageURL4(URL.createObjectURL(myBlob4));
        }
        setMoreThan1(true);
        setFinished(true);
      } else {
        // fetch a api blanco

        const finalImage = imgs[0];
        const finalImageByteArray = base64.toByteArray(finalImage);
        const blob = new Blob([finalImageByteArray], {
          type: "image/jpeg",
        });

        getLinks(blob);
        setImageURL(URL.createObjectURL(blob));

        setResult(true);
        setFinished(true);
      }
    };

    const handleImageSelect = () => {
      if (selectedImage === 0) {
        getLinks(blob1!);
        setImageURL(imageURL1);
      }
      if (selectedImage === 1) {
        getLinks(blob2!);
        setImageURL(imageURL2);
      }
      if (selectedImage === 2) {
        getLinks(blob3!);
        setImageURL(imageURL3);
      }
      if (selectedImage === 3) {
        getLinks(blob4!);
        setImageURL(imageURL4);
      }
      setMoreThan1(false);
      setResult(true);
      setFinished(true);
    };

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

      var imgs: any;

      console.log("BUDGET: " + budget);
      console.log("NUM IMAGES: " + numImages);

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

      console.log("WIDTH: " + inputImage.width);
      console.log("HEIGHT: " + inputImage.height);

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
          headers: {
            accept: "application/json",
            "x-api-key": "lsakslaoañ209sk1",
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => {
            imageProcessor(data, imgs);
          })
          .catch((error) => {
            imageError(error);
          });
      } else if (requiredInputs && !isNoImage && isNoMask) {
        // && !isNoNumber) {

        const obj = {
          budget: budget,
          style: style,
          environment: environment,
          weather: weather,
          disability: disability,
          num_images: numImages,
          steps: 20,
          guidance_scale: 7,
          controlnet_conditioning_scale: 1,
        };

        console.log("IMG NO MASK");

        setLoading(true);

        const formData = new FormData();

        formData.append("budget", budget);
        formData.append("style", style);
        formData.append("environment", environment);
        formData.append("weather", weather);
        formData.append("disability", disability);
        formData.append("num_images", numImages.toString());
        formData.append("steps", (21).toString());
        formData.append("guidance_scale", (7).toString());
        formData.append("controlnet_conditioning_scale", (1).toString());
        formData.append("input_image", inputImage);

        fetch("http://localhost:8000/img2img/v3", {
          method: "POST",
          headers: { "x-api-key": "lsakslaoañ209sk1" },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            imageProcessor(data, imgs);
          })
          .catch((error) => {
            imageError(error);
          });
      } else if (requiredInputs && !isNoImage && !isNoMask) {
        // && !isNoNumber) {

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

        console.log("ALL");

        setLoading(true);

        const formData = new FormData();

        formData.append("budget", budget);
        formData.append("style", style);
        formData.append("environment", environment);
        formData.append("weather", weather);
        formData.append("disability", disability);
        formData.append("num_images", numImages.toString());
        formData.append("steps", (21).toString());
        formData.append("guidance_scale", (7).toString());
        formData.append("controlnet_conditioning_scale", (1).toString());
        formData.append("input_image", inputImage);
        formData.append("mask_image", maskImage);

        fetch("http://localhost:8000/inpaint/v3", {
          method: "POST",
          headers: { "x-api-key": "lsakslaoañ209sk1" },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            imageProcessor(data, imgs);
          })
          .catch((error) => {
            imageError(error);
          });
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
              <SwiperResultShow
                imageURL1={imageURL1}
                imageURL2={imageURL2}
                imageURL3={imageURL3}
                imageURL4={imageURL4}
                setSelectedImage={setSelectedImage}
              />
              <button
                onClick={handleImageSelect}
                className="mb-[130px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#59C3C3] to-[#228187] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
              >
                Elegir
              </button>
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
              <div className="flex h-[300px] w-[300px] items-center justify-center rounded-2xl bg-[#000] p-[20px] dark:bg-[#111]">
                <h3 className="font-coolveticaRegular text-[27px] text-[#FBF9FA]">
                  {imagePrompt}
                </h3>
                <ul className="font-coolveticaBook text-[16px] text-[#FBF9FA]">
                  <li>{imageLink1}</li>
                  <li>{imageLink2}</li>
                  <li>{imageLink3}</li>
                </ul>
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
