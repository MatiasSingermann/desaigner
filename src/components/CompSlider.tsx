import Image from "next/image";
import { useState, useRef, TouchEvent } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1, translateY: 0 },
        hidden: { opacity: 0, scale: 1, translateY: 22 },
      }}
      className="mb-[36px] flex h-[190px] w-[282px] items-center justify-center overflow-clip rounded-2xl shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      <div
        ref={imgContainer}
        className="relative mt-2 flex h-full w-full max-w-4xl select-none items-center justify-center overflow-clip rounded-2xl"
      >
        <Image
          className="pointer-events-none absolute flex rounded-2xl"
          src="/OutputImg.png"
          width={282}
          height={282}
          alt="Output"
        />
        <Image
          className="pointer-events-none inset-0 flex rounded-2xl"
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
            <div className="bg-gradient-radial absolute inset-y-0 -ml-px w-[0.5] from-[#1D1B25] via-transparent"></div>
            <div className="absolute -ml-px h-full w-[2px] bg-[#1D1B25]"></div>
            <div
              className="absolute top-1/2 -ml-[10px] -mt-[10px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full bg-[#1D1B25]"
              style={{ touchAction: "none" }}
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
            >
              SVG
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CompSlider;
