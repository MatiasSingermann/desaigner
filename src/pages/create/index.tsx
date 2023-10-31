import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import base64 from "base64-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InpaintingEditor from "~/components/InpaintingEditor";
import ResLoad from "~/components/ResLoad";
import SwiperResultShow from "~/components/SwiperResultShow";
import SaveImageButton from "~/components/SaveImageButton";
import SaveImageInfo from "~/components/SaveImageInfo";

interface InputImageDataProps {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
}

interface dataImage {
  images: string[];
}

type FullDataImage = InputImageDataProps[];

function Index() {
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [blob1, setBlob1] = useState<Blob | null>(null);
  const [blob2, setBlob2] = useState<Blob | null>(null);
  const [blob3, setBlob3] = useState<Blob | null>(null);
  const [blob4, setBlob4] = useState<Blob | null>(null);
  const [imageFullData, setImageFullData] = useState<FullDataImage>(
    [] as FullDataImage
  );
  const [imageButtonClick, setImageButtonClick] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [inpaintMaskImg, setInpaintMaskImg] = useState<string | Blob | File>(
    ""
  );

  let isScrollDisabled = false;

  if (showEdit) {
    isScrollDisabled = true;
  } else {
    isScrollDisabled = false;
  }

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    return () => {
      if (isScrollDisabled) {
        document.body.classList.remove("disable-scroll");
      }
    };
  }, [isScrollDisabled]);

  let inputImage: FormDataEntryValue;
  inputImage = "";
  let noImage = "";
  let budget = "";
  let style = "";
  let environment = "";
  let weather = "";
  let disability = "";
  let numImages: number | string;

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
      setImageButtonClick(true);
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

    const linkShow = () => {
      // if (!imageFullData) return;
      return (
        <>
          {imageFullData.map((furniture, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center leading-none"
            >
              <div className="flex w-11/12 flex-col items-start justify-start">
                <h3 className="mx-[12px] mb-[14px] mt-[26px] flex w-11/12 items-start justify-start text-start font-coolveticaRegular text-[20px] text-[#292F2D] dark:text-[#FBF9FA]">
                  {furniture["prompt"]}
                </h3>
                <div className="mx-[12px] flex w-11/12 flex-col items-start justify-start text-start font-coolveticaBook text-[15px] text-[#2A9DA5]">
                  {furniture["links"][0] == "No hay link" ? (
                    <p className="mb-[14px] text-[#FBF9FA] no-underline">
                      No hay link
                    </p>
                  ) : (
                    <a
                      href={furniture["links"][0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-[22px] underline"
                    >
                      Link 1
                    </a>
                  )}
                  {furniture["links"][1] == "No hay link" ? (
                    <p className="mb-[14px] text-[#FBF9FA] no-underline">
                      No hay link
                    </p>
                  ) : (
                    <a
                      href={furniture["links"][1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-[22px] underline"
                    >
                      Link 2
                    </a>
                  )}
                  {furniture["links"][2] == "No hay link" ? (
                    <p className="mb-[22px] text-[#FBF9FA] no-underline">
                      No hay link
                    </p>
                  ) : (
                    <a
                      href={furniture["links"][2]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-[22px] underline"
                    >
                      Link 3
                    </a>
                  )}
                </div>
              </div>
              <div className="mx-[16px] flex h-[1px] w-11/12 items-center justify-center bg-[#BABABA] dark:bg-[#228187]"></div>
            </div>
          ))}
        </>
      );
    };

    const getLinks = (blob: Blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      fetch("https://desaigner-image-and-links-api.hf.space/", {
        // http://localhost:9000/
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_ORG_TOKEN!.toString()}`,
        },
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

    const imageProcessor = (data: dataImage) => {
      if (data.images.length > 1) {
        setLoading(false);
        const finalImage1 = data.images[0];
        const finalImage2 = data.images[1];
        const finalImageByteArray1 = base64.toByteArray(finalImage1!);
        const finalImageByteArray2 = base64.toByteArray(finalImage2!);
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
        if (data.images.length > 2) {
          const finalImage3 = data.images[2];
          const finalImageByteArray3 = base64.toByteArray(finalImage3!);
          const myBlob3 = new Blob([finalImageByteArray3], {
            type: "image/jpeg",
          });
          setBlob3(myBlob3);
          setImageURL3(URL.createObjectURL(myBlob3));
        }
        if (data.images.length > 3) {
          const finalImage4 = data.images[3];
          const finalImageByteArray4 = base64.toByteArray(finalImage4!);
          const myBlob4 = new Blob([finalImageByteArray4], {
            type: "image/jpeg",
          });
          setBlob4(myBlob4);
          setImageURL4(URL.createObjectURL(myBlob4));
        }
        setMoreThan1(true);
        setFinished(true);
      } else {
        const finalImage = data.images[0];
        const finalImageByteArray = base64.toByteArray(finalImage!);
        const blob = new Blob([finalImageByteArray], {
          type: "image/jpeg",
        });
        setLoading(true);
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
      setLoading(true);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const inputData = [];
      for (const pair of formData.entries()) {
        inputData.push(pair);
      }

      inputImage = inputData[0] ? inputData[0][1] : "";
      noImage = inputData[1] ? inputData[1][1].toString() : "";
      budget = inputData[2] ? inputData[2][1].toString() : "";
      style = inputData[3] ? inputData[3][1].toString() : "";
      environment = inputData[4] ? inputData[4][1].toString() : "";
      weather = inputData[5] ? inputData[5][1].toString() : "";
      disability = inputData[6] ? inputData[6][1].toString() : "";
      numImages = inputData[7] ? Number(inputData[7][1]) : "";
      const maskImage = inpaintMaskImg;

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

      console.log("inputImage", inputImage);

      if (!isNoImage && inputImage instanceof File && inputImage.size <= 0) {
        toast.error("Seleccionar si quiere subir una imagen o no", {
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

      if (maskImage != "") {
        isNoMask = false;
        setInpaintMaskImg("");
      } else {
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

        fetch("https://desaigner-image-creation-api.hf.space/txt2img/v2/v1", {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_ORG_TOKEN!.toString()}`,
            "x-api-key": apiKey,
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data: dataImage) => {
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

        fetch("https://desaigner-image-creation-api.hf.space/img2img/v3", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_ORG_TOKEN!.toString()}`,
            "x-api-key": apiKey,
          },
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
        formData.append("steps", (20).toString());
        formData.append("guidance_scale", (7).toString());
        formData.append("controlnet_conditioning_scale", (1).toString());
        formData.append("input_image", inputImage);
        formData.append("mask_image", maskImage);

        fetch("https://desaigner-image-creation-api.hf.space/inpaint/v3", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_ORG_TOKEN!.toString()}`,
            "x-api-key": apiKey,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data: dataImage) => {
            console.log(data);
            imageProcessor(data);
          })
          .catch((error: Error) => {
            console.log(error);
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
            <form
              action=""
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              ref={formRef}
              className="flex w-full flex-col items-center justify-center"
            >
              <StepShow
                setShowEdit={setShowEdit}
                image={image}
                setImage={setImage}
              />
              <InpaintingEditor
                setShowEdit={setShowEdit}
                showEdit={showEdit}
                image={image!}
                setInpaintMaskImg={setInpaintMaskImg}
              />
            </form>
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
                imageURL1={imageURL1}
                imageURL2={imageURL2}
                imageURL3={imageURL3}
                imageURL4={imageURL4}
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
                src={imageURL}
                alt="image"
                width={300}
                height={200}
                className="relative mx-[32px] my-[32px] flex h-[290px] w-[290px] items-center justify-center rounded-xl object-contain shadow-md shadow-[#999] dark:shadow-[#111]"
              ></Image>

              <div className="relative flex h-[300px] w-[300px] flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-2xl border-[2px] border-[#BABABA] bg-[#E8E8E8] dark:border-none dark:bg-[#293433]">
                <div className="absolute top-0 flex w-full flex-col">
                  {linkShow()}
                </div>
              </div>
              <SaveImageButton handleSaveImage={handleSaveImage} />
              {imageButtonClick && (
                <SaveImageInfo
                  environment={environment}
                  budget={budget}
                  style={style}
                  image={blob1!}
                  furniture={imageFullData} // {["", ""]}
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
