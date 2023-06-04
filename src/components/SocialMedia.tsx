interface SocialMediaProps {
  hlink: string;
  icon: JSX.Element;
}

function SocialMedia({ hlink, icon }: SocialMediaProps) {
  return (
    <li>
      <a className="flex items-center justify-center p-[2px]" href={hlink}>
        {icon}
      </a>
    </li>
  );
}

export default SocialMedia;
