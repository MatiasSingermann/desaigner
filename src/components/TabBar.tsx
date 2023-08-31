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
  const [translateX, setTranslateX] = useState<number>(5);
  const [activated, setActivated] = useState(false);
  let element: HTMLDivElement | null;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetDiv = e.currentTarget;
    const targetRect = targetDiv.getBoundingClientRect();
    const targetRectX = targetRect.x;

    if (elementRef.current != element) {
      element = elementRef.current;
    }

    const width = element!.offsetWidth;
    setTranslateX(Math.floor(targetRectX - width / 4.8));
    if (activated === false) {
      setActivated(true);
    } else {
      setActivated(false);
    }
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
            key="Rocket"
            href="/landing"
            image={<Rocket />}
            handleClick={handleClick}
            activated={activated}
          />
          <TabBarButton
            key="House"
            href="/home"
            image={<House />}
            handleClick={handleClick}
            activated={activated}
          />
          <TabBarButton
            key="Sparkle"
            href="/create"
            image={<Sparkle />}
            handleClick={handleClick}
            activated={activated}
          />
          <TabBarButton
            key="Folder"
            href="/collections"
            image={<Folder />}
            handleClick={handleClick}
            activated={activated}
          />
          <TabBarButton
            key="Gear"
            href="/settings"
            image={<Gear />}
            handleClick={handleClick}
            activated={activated}
          />
        </ul>
      </div>
    </div>
  );
});

export default TabBar;
