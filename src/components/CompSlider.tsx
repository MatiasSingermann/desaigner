import Image from "next/image";
import { useState, useRef, TouchEvent } from "react";

function CompSlider() {
  const [imgRevealFraq, setImgRevealFraq] = useState(0.5);
  const imgContainer = useRef<HTMLDivElement>(null);

  const slide = (xPosition: number): void => {
    const containerBoundingRect = imgContainer.current?.getBoundingClientRect();
    containerBoundingRect;
    setImgRevealFraq(() => {
      if (xPosition < containerBoundingRect!.left) {
        return 0;
      } else if (xPosition > containerBoundingRect!.right) {
        return 1;
      } else {
        return (
          (xPosition - containerBoundingRect!.left) /
          containerBoundingRect!.width
        );
      }
    });
  };

  const handleMouseDown = (): void => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };

  const handleMouseUp = (event: MouseEvent): void => {
    window.onmousemove = null;
    window.onmouseup = null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
    slide(event.touches.item(0).clientX);
  };

  return (
    <div className="flex h-[190px] w-[282px] items-center justify-center overflow-clip rounded-2xl px-4 shadow-xl mb-[36px]">
      <div ref={imgContainer} className="flex relative mt-2 max-w-4xl select-none overflow-clip rounded-2xl">
        <Image
          className="pointer-events-none rounded-lg"
          src="/OutputImg.png"
          width={282}
          height={282}
          alt="Output"
        />
        <Image
          className="pointer-events-none absolute inset-0 rounded-lg"
          src="/InputImg.png"
          width={282}
          height={282}
          alt="Input"
          style={{
            clipPath: `polygon(0 0, ${imgRevealFraq * 100}% 0, ${
              imgRevealFraq * 100
            }% 100%, 0 100%)`,
          }}
        />
        <div
          className="absolute inset-y-0"
          style={{ left: `${imgRevealFraq * 100}%` }}
        >
          <div className="relative h-full">
            <div className="bg-gradient-radial absolute inset-y-0 -ml-px w-0.5 from-[#1D1B25] via-transparent"></div>
            <div
              className="absolute top-1/2 -ml-[13px] -mt-[13px] flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full bg-[#1D1B25]"
              style={{ touchAction: "none" }}
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
            >
              SVG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompSlider;
