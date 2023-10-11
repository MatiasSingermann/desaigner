import Link from "next/link";
import type { MouseEventHandler } from "react";
import TabCurve from "./TabCurve";

interface TabBarButtonProps {
  name: string;
  href: string;
  image: JSX.Element;
  handleClick: MouseEventHandler<HTMLDivElement>;
  myRoute: string;
}

function TabBarButton({
  name,
  href,
  image,
  handleClick,
  myRoute,
}: TabBarButtonProps) {
  const liContent = () => {
    const rocketCondition =
      (name === "Rocket" && (myRoute === "/landing" || myRoute === "/login"))
        ? "tabbar-selected"
        : "";
    const homeCondition =
      (name === "House" && myRoute === "/home") ? "tabbar-selected" : "";
    const sparkleCondition =
      (name === "Sparkle" && myRoute === "/create") ? "tabbar-selected" : "";
    const folderCondition =
      (name === "Folder" && myRoute === "/collections") ? "tabbar-selected" : "";
    const gearCondition =
      (name === "Gear" && myRoute === "/settings") ? "tabbar-selected" : "";

    const curveRocketCondition =
      (name === "Rocket" && (myRoute === "/landing" || myRoute === "/login"))
        ? "flex"
        : "hidden";
    const curveHomeCondition =
      (name === "House" && myRoute === "/home") ? "flex" : "hidden";
    const curveSparkleCondition =
      (name === "Sparkle" && myRoute === "/create") ? "flex" : "hidden";
    const curveFolderCondition =
      (name === "Folder" && myRoute === "/collections") ? "flex" : "hidden";
    const curveGearCondition =
      (name === "Gear" && myRoute === "/settings") ? "flex" : "hidden";
    return (
      <div className="flex flex-col items-center">
        <div
          className={`absolute -top-[24px] mb-[80px] ${curveRocketCondition} ${curveHomeCondition} ${curveSparkleCondition} ${curveFolderCondition} ${curveGearCondition}`}
        >
          <TabCurve />
        </div>
        <li>
          <Link href={href} aria-label={"Ir a" + href}>
            <div
              className={`z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all ${rocketCondition} ${homeCondition} ${sparkleCondition} ${folderCondition} ${gearCondition}`}
              onClick={handleClick}
            >
              {image}
            </div>
          </Link>
        </li>
      </div>
    );
  };
  return (
    <>
      {href === "/landing" ? liContent() : null}
      {href === "/home" ? liContent() : null}
      {href === "/create" ? liContent() : null}
      {href === "/collections" ? liContent() : null}
      {href === "/settings" ? liContent() : null}
    </>
  );
}

export default TabBarButton;
