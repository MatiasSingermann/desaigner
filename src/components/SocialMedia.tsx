import Image from "next/image";

interface SocialMediaProps {
  hlink: string;
  alabel: string;
  icon: string;
}

function SocialMedia({ hlink, alabel, icon }: SocialMediaProps) {
  return (
    <li className="flex">
      <a className="flex items-center justify-center p-[2px] 360:scale-150 720:scale-[2] fill-[#FBF9FA] hover:fill-[#E8E8E8]" href={hlink} aria-label={alabel}>
        <Image src={icon} alt="Logo" width={20} height={20}/>
      </a>
    </li>
  );
}

export default SocialMedia;
