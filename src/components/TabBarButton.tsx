import Link from "next/link";

interface TabBarButtonProps {
    href: string;
    image: JSX.Element;
}

function TabBarButton({href, image} : TabBarButtonProps) {
  return (
    <Link href={href}>
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#59C3C3]">
        {image}
      </div>
    </Link>
  );
}

export default TabBarButton;
