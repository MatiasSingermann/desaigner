import { useState, useRef, memo } from "react";
import Rocket from "./Rocket";
import TabBarButton from "./TabBarButton";
import House from "./House";
import Sparkle from "./Sparkle";
import Gear from "./Gear";
import Folder from "./Folder";
import TabCurve from "./TabCurve";

const TabBar = memo(function TabBar() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const targetDiv = e.currentTarget;
    const targetRect = targetDiv.getBoundingClientRect();
    const targetRectX = targetRect.x;

    const element = elementRef.current;
    const width = element!.offsetWidth;
    setTranslateX(Math.floor(targetRectX - width / 4.6));
  };
  return (
    <div className="fixed bottom-0 z-[100] flex h-[70px] w-full 480:hidden">
      <div
        className="absolute bottom-[66px] flex items-center justify-center transition-all"
        ref={elementRef}
        style={{ translate: translateX }}
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
