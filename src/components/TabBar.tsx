import { useState, useRef, memo } from "react";
import { useRouter } from "next/router";
import Rocket from "./Rocket";
import TabBarButton from "./TabBarButton";
import House from "./House";
import Sparkle from "./Sparkle";
import Gear from "./Gear";
import Folder from "./Folder";
import TabCurve from "./TabCurve";

const TabBar = memo(function TabBar() {
  const router = useRouter();
  const elementRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<number>(5);
  let element: HTMLDivElement | null;
  const [counter, setCounter] = useState(0)
  const [previousDiv, setPreviousDiv] = useState<EventTarget & HTMLDivElement>()
  const [previousDivClassName, setPreviousDivClassName] = useState("")

  const myRoute = router.route;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // const targetDiv = e.currentTarget;
    // const targetRect = targetDiv.getBoundingClientRect();
    // const targetRectX = targetRect.x;
   
    // if(targetDiv != previousDiv){
    //   if(targetDiv.className.includes("tabbar-selected") === false){
    //     // targetDiv.className += " tabbar-selected";
    //   }
    //   if(counter === 1){
    //     previousDiv!.className = previousDivClassName;
    //   }
    //   setPreviousDiv(targetDiv);
    //   setPreviousDivClassName("flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all")
    // }

    // if(counter == 0) {
    //   setCounter(1);
    // }

    // if (elementRef.current != element) {
    //   element = elementRef.current;
    // }

    // const width = element!.offsetWidth;
    // setTranslateX(Math.floor(targetRectX - width / 4.8));
  };
  return (
    <div className="fixed bottom-0 z-[100] flex h-[70px] w-full 480:hidden">
      {/* <div
        className="absolute bottom-[66px] flex items-center justify-center transition-all"
        ref={elementRef}
        style={{ translate: translateX }}
      >
        <TabCurve />
      </div> */}
      <div className="flex h-[70px] w-full items-center justify-center bg-[#228187] px-[24px]">
        <ul className="flex h-full w-full items-center justify-between">
          <TabBarButton
            name="Rocket"
            href="/landing"
            image={<Rocket />}
            handleClick={handleClick}
            myRoute={myRoute}
          />
          <TabBarButton
            name="House"
            href="/home"
            image={<House />}
            handleClick={handleClick}
            myRoute={myRoute}
          />
          <TabBarButton
            name="Sparkle"
            href="/create"
            image={<Sparkle />}
            handleClick={handleClick}
            myRoute={myRoute}
          />
          <TabBarButton
            name="Folder"
            href="/collections"
            image={<Folder />}
            handleClick={handleClick}
            myRoute={myRoute}
          />
          <TabBarButton
            name="Gear"
            href="/settings"
            image={<Gear />}
            handleClick={handleClick}
            myRoute={myRoute}
          />
        </ul>
      </div>
    </div>
  );
});

export default TabBar;
