import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Arrow from "../Arrow";
import Trash from "../Trash";

interface ColecDesignProps {
  setShowFolder: Dispatch<SetStateAction<boolean>>;
  setShowDesignInfo: Dispatch<SetStateAction<boolean>>;
  imageData: ImgData | undefined;
}

interface ImgData {
  nombre: string;
  id: number;
  colecciones: string[];
  fecha: string;
  imagen: string;
  muebles: FullDataImage;
  ambiente: string;
  presupuesto: string;
  estilo: string;
}

interface InputImageDataProps {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
}

type FullDataImage = InputImageDataProps[];

function ColecDesignInfo({
  setShowFolder,
  setShowDesignInfo,
  imageData,
}: ColecDesignProps) {
  const deleteDesign = () => {
    const obj = {
      id: imageData!.id,
    };
    fetch("api/auth/deleteDisenio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then(() => {
        //console.log(data);
        setShowFolder(false);
        setShowDesignInfo(false);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
  const linkShow = () => {
    return (
      <>
        {imageData!.muebles.map((furniture, index) => (
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
                  <p className="mb-[14px] text-[#292F2D] no-underline dark:text-[#FBF9FA]">
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
                  <p className="mb-[14px] text-[#292F2D] no-underline dark:text-[#FBF9FA]">
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
                  <p className="mb-[22px] text-[#292F2D] no-underline dark:text-[#FBF9FA]">
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
  const closeImage = () => {
    setShowDesignInfo(false);
    setShowFolder(true);
  };
  return (
    <>
      <div className="mx-[26px] mb-[30px] flex w-[90%] items-center justify-start self-start">
        <button
          onClick={closeImage}
          className={`} rotate-[90deg] scale-[1.0] fill-[#228187] stroke-[#228187]
        stroke-2`}
        >
          <Arrow />
        </button>
        <h1 className="mx-[12px] flex self-start font-coolveticaRegular text-[30px] leading-none text-[#22302D] dark:text-[#FBF9FA]">
          {imageData!.nombre}
        </h1>
      </div>
      <Image
        src={imageData!.imagen}
        alt="image"
        width={300}
        height={200}
        className="relative mx-[32px] mb-[32px] flex h-[290px] w-[290px] items-center justify-center rounded-xl object-contain shadow-md shadow-[#999] dark:shadow-[#111]"
      />
      <h2 className="mx-[60px] mb-[12px] flex self-start font-coolveticaBook text-[20px] text-[#22302D] dark:text-[#FBF9FA]">
        Fecha de creación: {imageData!.fecha.split("T")[0]?.replaceAll("-", "/")}
      </h2>
      <h2 className="mx-[60px] mb-[12px] flex self-start font-coolveticaBook text-[20px] text-[#22302D] dark:text-[#FBF9FA]">
        Presupuesto: {imageData!.presupuesto}
      </h2>
      <h2 className="mx-[60px] mb-[12px] flex self-start font-coolveticaBook text-[20px] text-[#22302D] dark:text-[#FBF9FA]">
        Estilo: {imageData!.estilo}
      </h2>
      <h2 className="mx-[60px] mb-[32px] flex self-start font-coolveticaBook text-[20px] text-[#22302D] dark:text-[#FBF9FA]">
        Ambiente: {imageData!.ambiente}
      </h2>
      <h2 className="mx-[60px] mb-[32px] flex self-start font-coolveticaRegular text-[20px] text-[#22302D] dark:text-[#FBF9FA]">
        Muebles encontrados:
      </h2>
      <div className="relative flex h-[300px] w-[300px] flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-2xl border-[2px] border-[#BABABA] bg-[#E8E8E8] dark:border-none dark:bg-[#293433]">
        <div className="absolute top-0 flex w-full flex-col">{linkShow()}</div>
      </div>
      <button
        onClick={deleteDesign}
        className="mb-[48px] mt-[32px] flex h-[36px] w-[150px] items-center justify-between rounded-3xl bg-[#59C3C3] pl-[14px] pr-[44px] text-center font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#999] dark:bg-[#2A9DA5] dark:shadow-[#111]"
      >
        <div className="flex items-center justify-center">
          <Trash />
        </div>
        Borrar
      </button>
    </>
  );
}

export default ColecDesignInfo;
