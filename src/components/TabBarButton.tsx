import Link from "next/link";
import type { MouseEventHandler } from "react";

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
    const rocketCondition = name === "Rocket" && (myRoute === "/landing" || myRoute === "/login") ? "tabbar-selected" : "";
    const homeCondition = name === "House" && myRoute === "/home" ? "tabbar-selected" : "";
    const sparkleCondition = name === "Sparkle" && myRoute === "/create" ? "tabbar-selected" : "";
    const folderCondition = name === "Folder" && myRoute === "/collections" ? "tabbar-selected" : "";
    const gearCondition = name === "Gear" && myRoute === "/settings" ? "tabbar-selected" : "";
    return (
      <li>
        <Link href={href} aria-label={"Ir a" + href}>
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all ${name} ${rocketCondition} ${homeCondition} ${sparkleCondition} ${folderCondition} ${gearCondition}`}
            onClick={handleClick}
          >
            {image}
          </div>
        </Link>
      </li>
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
