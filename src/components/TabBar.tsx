import { useState, useRef, memo } from "react";
import Rocket from "./Rocket";
import TabBarButton from "./TabBarButton";
import House from "./House";
import Sparkle from "./Sparkle";
import Gear from "./Gear";
import Folder from "./Folder";
import TabCurve from "./TabCurve";

const TabBar = memo(function TabBar() {
  const [targetX, setTargetX] = useState<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<string>(
    `calc(${24}px - ${88 / 4.6}px )`
  );

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log("CLICK");
    const targetDiv = e.currentTarget;
    console.log("TARGET DIV: " + targetDiv);
    const targetRect = targetDiv.getBoundingClientRect();
    const targetRectX = targetRect.x
    console.log("TARGET RECT X: " + targetRectX);
    setTargetX(targetRectX);
    console.log("TARGET X: " + targetX);

    const element = elementRef.current;
    const width = element!.offsetWidth;
    setTranslateX(`calc(${targetX}px - ${width / 4.6}px )`);
    element!.style.transform = (`translateX(${translateX})`);
  };
  return (
    <div className="fixed bottom-0 z-[100] flex h-[70px] w-full 480:hidden">
      <div
        className="absolute bottom-[66px] flex items-center justify-center transition-all"
        ref={elementRef}
      >
        <TabCurve />
      </div>
      <div className="flex h-[70px] w-full items-center justify-center bg-[#228187] px-[24px]">
        <ul className="flex h-full w-full items-center justify-between">
          <TabBarButton
            href="/landing"
            image={<Rocket />}
            handleClick={handleClick}
          />
          <TabBarButton
            href="/home"
            image={<House />}
            handleClick={handleClick}
          />
          <TabBarButton
            href="/create"
            image={<Sparkle />}
            handleClick={handleClick}
          />
          <TabBarButton
            href="/collections"
            image={<Folder />}
            handleClick={handleClick}
          />
          <TabBarButton
            href="/settings"
            image={<Gear />}
            handleClick={handleClick}
          />
        </ul>
      </div>
    </div>
  );
});

export default TabBar;
