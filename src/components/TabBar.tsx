import { useState } from "react";
import Rocket from "./Rocket";
import TabBarButton from "./TabBarButton";
import House from "./House";
import Sparkle from "./Sparkle";
import Gear from "./Gear";
import Folder from "./Folder";
import TabCurve from "./TabCurve";

function TabBar() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <div className="relative flex h-[70px] w-full">
        <div className="relative -top-[45px] flex items-center justify-center">
          <TabCurve />
        </div>
      </div>
      <div className="fixed bottom-0 z-[100] flex h-[70px] w-full items-center justify-center bg-[#228187] px-[24px] 480:hidden">
        <ul className="flex items-center justify-between h-full w-full">
          <TabBarButton href="/landing" image={<Rocket />} />
          <TabBarButton href="/home" image={<House />} />
          <TabBarButton href="/create" image={<Sparkle />} />
          <TabBarButton href="/collections" image={<Folder />} />
          <TabBarButton href="/settings" image={<Gear />} />
        </ul>
      </div>
    </>
  );
}

export default TabBar;
