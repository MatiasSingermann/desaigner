import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface TabBarButtonProps {
  href: string;
  image: JSX.Element;
  handleClick: any;
  activated: SetStateAction<boolean>;
}

function TabBarButton({
  href,
  image,
  handleClick,
  activated,
}: TabBarButtonProps) {
  const liContent = () => {
    return (
      <li>
        <Link href={href}>
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all ${
              activated ? "translate-y-[-27px] bg-[#59C3C3]" : ""
            }`}
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
