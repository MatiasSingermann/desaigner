import Cross from "./Cross";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import BrushSlider from "./BrushSlider";
import Eraser from "./Eraser";
import TrashCan from "./TrashCan";
import BrushBig from "./BrushBig";

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showEdit: SetStateAction<boolean>;
  image: string;
  setInpaintMaskImg: Dispatch<SetStateAction<string | Blob | File>>;
}

function InpaintingEditor({
  setShowEdit,
  showEdit,
  image,
  setInpaintMaskImg,
}: InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };

  const convertDataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return blob;
  };

  const convertBlobToFile = (
    blob: Blob,
    filename: string,
    mimeType: string
  ): File => {
    const file = new File([blob], filename, { type: mimeType });
    return file;
  };

  const [drawActivated, setDrawActivated] = useState(true);
  const [eraseActivated, setEraseActivated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const [aspRatio, setAspRatio] = useState("4:3");

  const [renderCanvas, setRenderCanvas] = useState(false);

  const img = imgRef.current;
  const imgOriginalWidth = img?.naturalWidth;
  const imgOriginalHeight = img?.naturalHeight;
  const aspectRatio = imgOriginalWidth! / imgOriginalHeight!;

  if (aspectRatio > 4 / 3) {
    if(aspRatio != "16:9"){
      setAspRatio("16:9");
    }
  } else {
    if(aspRatio != "4:3"){
      setAspRatio("4:3");
    }
  }

  useEffect(() => {
    setRenderCanvas(showEdit);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
  
      const touch = new Touch({
        identifier: 0,
        target: canvas,
        clientX: 100,
        clientY: 100,
        radiusX: 2,
        radiusY: 2,
        rotationAngle: 10,
        force: 0.5,
      });
  
      const touchEvent = new TouchEvent('touchstart', {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch],
      });
  
      canvas.dispatchEvent(touchEvent);
    }
  }, [showEdit]);

  const handleInpainting = () => {
    try{
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          // canvas.setAttribute(
          //   "style",
          //   `background-color: black; opacity: 1; width: ${imgOriginalWidth}; height: ${imgOriginalHeight};`
          // );
          const inpaintingMaskImageString = canvas.toDataURL("image/png");
          console.log("impMaskImg", inpaintingMaskImageString);
          convertDataUrlToBlob(
            inpaintingMaskImageString
          ) .then(inpaintingMaskImageBlob => {
            const inpaintingMaskImage = convertBlobToFile(
              inpaintingMaskImageBlob,
              "image.png",
              "image/png"
            );
            setInpaintMaskImg(inpaintingMaskImage);
            console.log("listo", inpaintingMaskImage);
            setShowEdit(false);
          }) .catch(
            console.error
          );
        }
    }
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const [slider, setSlider] = useState<number[]>([15]);

  const canvas = canvasRef.current;

  let lastX : number;
  let lastY : number;

  if (canvas) {
    if (aspRatio != "16:9") {
      if (canvas.width != 304 && canvas.height != 228) {
        canvas.width = 304;
        canvas.height = 228;
      }
    } else {
      if (canvas.width != 310 && canvas.height != 174) {
        canvas.width = 310;
        canvas.height = 174;
      }
    }
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

  const startDrawingMobile = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (canvas) {
      setIsDrawing(true);
      const touch = e.touches[0];
      if (touch) {
        const rect = canvas.getBoundingClientRect();
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
      }
    }
  };

  const drawMobile = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (canvas && contextRef.current) {
      const touch = e.touches[0];
      if (touch) {
        const { clientX, clientY } = touch;
        const rect = canvas.getBoundingClientRect();
        const currentX = clientX - rect.left;
        const currentY = clientY - rect.top;

        contextRef.current.beginPath();
        contextRef.current.moveTo(lastX, lastY);
        contextRef.current.lineTo(currentX, currentY);
        contextRef.current.stroke();

        lastX = currentX;
        lastY = currentY;
      }
    }
  };

  const stopDrawingMobile = () => {
    setIsDrawing(false);
  };

  return (
    <>
      {renderCanvas && (
        <div
          className={`top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${
            showEdit ? "fixed " : "hidden"
          }`}
        >
          <div
            className={`relative mb-[26px] flex h-[480px] w-[342px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px] ${
              aspRatio === "16:9" ? "h-[432px]" : "h-[480px]"
            }`}
          >
            <button
              onClick={handleClick}
              className="absolute right-0 top-0 z-10 mr-[28px] mt-[32px] flex scale-[1.2]"
              form="false"
            >
              <Cross />
            </button>
            <h1 className="mb-[20px] mt-[32px] flex w-[228px] text-center font-coolveticaRegular text-[23px] leading-none text-[#FBF9FA]">
              Dibuje sobre lo que quiere modificar
            </h1>
            <div
              className={`relative my-[20px] flex ${
                aspRatio === "16:9"
                  ? "h-[174px] w-[310px]"
                  : "h-[228px] w-[304px]"
              } flex-col items-center justify-center rounded-2xl`}
            >
              <canvas
                className={`absolute z-10 flex items-center justify-center rounded-2xl bg-transparent opacity-[0.6]`}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawingMobile}
                onTouchMove={drawMobile}
                onTouchEnd={stopDrawingMobile}
                onTouchCancel={stopDrawingMobile}
              ></canvas>
              <Image
                className={`absolute flex ${
                  aspRatio === "16:9"
                    ? "h-[174px] w-[310px]"
                    : "h-[228px] w-[304px]"
                } items-center justify-center rounded-2xl object-cover`}
                ref={imgRef}
                src={image}
                width={aspRatio === "16:9" ? 310 : 304}
                height={aspRatio === "16:9" ? 174 : 228}
                alt="Imagen a editar"
              />
            </div>
            <div className="mb-[22px] mt-[8px] flex h-[40px] w-full items-center justify-between">
              <button
                onClick={setToDraw}
                className={`flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#C4C4C4] hover:bg-[#949494] ${
                  drawActivated ? "fill-[#C35959]" : ""
                }`}
              >
                <BrushBig drawActivated={drawActivated} />
              </button>
              <button
                onClick={setToErase}
                className={`flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#C4C4C4] hover:bg-[#949494] ${
                  eraseActivated ? "fill-[#C35959]" : ""
                }`}
              >
                <Eraser eraseActivated={eraseActivated} />
              </button>
              <button
                onClick={clear}
                className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#C4C4C4] hover:bg-[#949494]"
              >
                <TrashCan />
              </button>
              <div className="flex flex-col items-center justify-center">
                <p className="text-center font-coolveticaRegular text-[18px] text-[#FBF9FA]">
                  Tamaño del pincel
                </p>
                <BrushSlider setSlider={setSlider} slider={slider} />
              </div>
            </div>
            <button
              form="false"
              className="flex h-[36px] w-[132px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
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
      )}
    </>
  );
}

export default InpaintingEditor;
