import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface TabBarButtonProps {
  key: string;
  href: string;
  image: JSX.Element;
  handleClick: any;
  activated: SetStateAction<boolean>;
  setActivateList: Dispatch<SetStateAction<number[]>>;
}

function TabBarButton({
  key,
  href,
  image,
  handleClick,
  activated,
  setActivateList,
}: TabBarButtonProps) {
  const liContent = () => {
    return (
      <li>
        <Link href={href}>
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all ${
              activated ? "translate-y-[-27px] bg-[#59C3C3]" : null
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
