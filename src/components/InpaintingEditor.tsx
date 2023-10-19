import Cross from "./Cross";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import BrushSlider from "./BrushSlider";

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showEdit: SetStateAction<boolean>;
  image: string;
  aspectRatio169: SetStateAction<boolean>;
}

function InpaintingEditor({
  setShowEdit,
  showEdit,
  image,
  aspectRatio169,
}: InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };

  const [drawActivated, setDrawActivated] = useState(true);
  const [eraseActivated, setEraseActivated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const img = imgRef.current;
  console.log("img", img);
  const imgOriginalWidth = img?.naturalWidth;
  console.log("imgOriginalWidth", imgOriginalWidth);
  const imgOriginalHeight = img?.naturalHeight;
  const imgAlteredWidth = img?.width;
  const imgAlteredHeight = img?.height;
  let aspRatio = "4:3";
  const aspectRatio = imgOriginalWidth! / imgOriginalHeight!;
  if (aspectRatio > 4/3) {
    aspRatio = "16:9";
  }

  console.log('aspRatio', aspRatio)

  const handleInpainting = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.setAttribute("style", "background-color: black; opacity: 1;");
      }
      const inpaintingMaskImage = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    }
  };

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const [slider, setSlider] = useState<number[]>([15]);

  const canvas = canvasRef.current;
  if (canvas) {
    const context = canvas.getContext("2d");
    if (context) {
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#59C3C3";
      context.lineWidth = Number(slider);
      contextRef.current = context;
    }
  }

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const setToDraw = () => {
    setDrawActivated(true);
    setEraseActivated(false);
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = "source-over";
    }
  };

  const setToErase = () => {
    setDrawActivated(false);
    setEraseActivated(true);
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = "destination-out";
    }
  };

  const clear = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  return (
    <>
      {showEdit ? (
        <div
          className={`top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${
            showEdit ? "fixed " : "hidden"
          }`}
        >
          <div className="relative flex h-[480px] w-[342px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px] mb-[26px]">
            <button
              onClick={handleClick}
              className="absolute right-0 top-0 z-10 mt-[32px] mr-[28px] flex scale-[1.2]"
              form="false"
            >
              <Cross />
            </button>
            <h1 className="mb-[20px] mt-[32px] flex text-center font-coolveticaRegular text-[23px] leading-none text-[#FBF9FA] w-[228px]">
              Dibuje sobre lo que quiere modificar
            </h1>
            <div
              className={`relative my-[20px] flex ${
                aspRatio === "16:9" ? "h-[174px] w-[310px]" : "h-[228px] w-[304px]"
              } flex-col items-center justify-center rounded-2xl`}
            >
              <canvas
                className={`absolute z-10 flex ${
                  aspRatio === "16:9" ? "h-[174px] w-[310px]" : "h-[228px] w-[304px]"
                } items-center justify-center bg-transparent opacity-[0.6] rounded-2xl`}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              ></canvas>
              <Image
                className={`absolute flex ${
                  aspRatio === "16:9" ? "h-[174px] w-[310px]" : "h-[228px] w-[304px]"
                } items-center justify-center object-cover rounded-2xl`}
                ref={imgRef}
                src={image}
                width={(aspRatio === "16:9" ? 310 : 304)}
                height={(aspRatio === "16:9" ? 174 : 228)}
                alt="Imagen a editar"
              />
            </div>
            <div className="mt-[8px] flex h-[40px] w-full items-center justify-between">
              <button
                onClick={setToDraw}
                className={`flex h-[40px] w-[80px] items-center justify-center rounded-xl ${
                  drawActivated ? "bg-red-500" : null
                }`}
              >
                Dibujar
              </button>
              <button
                onClick={setToErase}
                className={`flex h-[40px] w-[80px] items-center justify-center rounded-xl ${
                  eraseActivated ? "bg-red-500" : null
                }`}
              >
                Borrar
              </button>
              <button
                onClick={clear}
                className="flex h-[40px] w-[80px] items-center justify-center rounded-xl"
              >
                Eliminar
              </button>
            </div>
            <BrushSlider setSlider={setSlider} slider={slider} />
            <button
              form="false"
              className="mb-[12px] flex h-[36px] w-[132px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
              onClick={handleInpainting}
            >
              Aceptar
            </button>
          </div>
          <input
            type="text"
            name="maskImage"
            className="hidden"
            readOnly={true}
            value="TEST"
          />
        </div>
      ) : null}
    </>
  );
}

export default InpaintingEditor;
