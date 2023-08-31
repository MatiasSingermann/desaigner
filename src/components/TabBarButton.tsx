import Link from "next/link";
import { MouseEventHandler, SetStateAction } from "react";

interface TabBarButtonProps {
  name: string;
  href: string;
  image: JSX.Element;
  handleClick: MouseEventHandler<HTMLDivElement>;
  activated: SetStateAction<boolean>;
}

function TabBarButton({
  name,
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
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all ${name}`}
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
