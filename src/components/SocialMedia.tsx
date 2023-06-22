interface SocialMediaProps {
  hlink: string;
  alabel: string;
  icon: JSX.Element;
}

function SocialMedia({ hlink, alabel, icon }: SocialMediaProps) {
  return (
    <li className="flex">
      <a className="flex items-center justify-center p-[2px] 360:scale-150 720:scale-[2] fill-[#FBF9FA] hover:fill-[#E8E8E8]" href={hlink} aria-label={alabel}>
        {icon}
      </a>
    </li>
  );
}

export default SocialMedia;
