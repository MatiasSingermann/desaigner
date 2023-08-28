import Link from "next/link";

interface TabBarButtonProps {
  href: string;
  image: JSX.Element;
  handleClick: any;
}

function TabBarButton({ href, image, handleClick }: TabBarButtonProps) {
  return (
    <li>
      <Link href={href}>
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#59C3C3]" onClick={handleClick}>
          {image}
        </div>
      </Link>
    </li>
  );
}

export default TabBarButton;
