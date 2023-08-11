import Link from "next/link";

interface LandingButtonProps {
  text: string;
  color: string;
  link: string;
}

function LandingButton({ text, color, link }: LandingButtonProps) {
  return (
    <Link
      href={link}
      className={`mb-[22px] flex h-[36px] w-[186px] cursor-pointer items-center justify-center rounded-2xl font-coolveticaRegular text-[20px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111] ${color}`}
    >
      {text}
    </Link>
  );
}

export default LandingButton;
