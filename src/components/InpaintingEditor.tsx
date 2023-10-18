import Cross from "./Cross";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface InpaintingEditorProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showEdit: SetStateAction<boolean>;
  image: string;
}

function InpaintingEditor({
  setShowEdit,
  showEdit,
  image,
}: InpaintingEditorProps) {
  const handleClick = () => {
    setShowEdit(false);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = 500;
            canvas.height = 500;

            const context = canvas.getContext("2d");
            if (context) {
                context.lineCap = "round";
                context.lineJoin = 'round';
                context.strokeStyle = '#59C3C3';
                context.lineWidth = 20;
                contextRef.current = context;
            }
        }
    }, []);

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
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

    // const setToDraw = () => {
    //     if (contextRef.current) {
    //         contextRef.current.globalCompositeOperation = 'source-over';
    //     }
    // };

    // const setToErase = () => {
    //     if (contextRef.current) {
    //         contextRef.current.globalCompositeOperation = 'destination-out';
    //     }
    // };

    // const clear = () => {
    //     if (contextRef.current && canvasRef.current) {
    //         contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //     }
    // };

  return (
    <>
      {showEdit ? (
        <div
          className={`top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70 ${
            showEdit ? "fixed " : "hidden"
          }`}
        >
          <div className="relative flex h-[380px] w-[324px] flex-col items-center justify-start rounded-2xl bg-[#22302D] px-[14px]">
            <button
              onClick={handleClick}
              className="absolute right-0 top-0 z-10 m-[12px] flex"
              form="false"
            >
              <Cross />
            </button>
            <h1 className="mb-[20px] mt-[40px] text-center font-coolveticaRegular text-[30px] leading-none text-[#FBF9FA]">
              Dibuje sobre lo que quiere modificar
            </h1>
            <div className="relative flex h-[160px] w-[292px] flex-col items-center justify-center">
              <canvas
                className="absolute z-10 my-[20px] flex h-[160px] w-[292px] items-center justify-center rounded-xl bg-transparent"
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              ></canvas>
              <Image
                className="absolute my-[20px] h-[160px] w-[292px] items-center justify-center rounded-xl object-contain"
                src={image}
                width={292}
                height={160}
                alt="Imagen a editar"
              />
            </div>
            <button
              form="false"
              className="absolute bottom-0 mb-[38px] flex h-[36px] w-[94px] items-center justify-center rounded-3xl bg-[#228187] font-coolveticaRegular text-[18px] text-[#FBF9FA] shadow-md shadow-[#111]"
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
