import Link from 'next/link'

interface FooterLinksLeftProps {
  hlink: string;
  text: string;
}

function FooterLinksLeft({ hlink, text }: FooterLinksLeftProps) {
  return (
    <li className="flex text-right items-center">
      <Link className="flex items-center justify-start p-[2px] text-left text-[#FBF9FA] hover:text-[#E8E8E8] w-fit" href={hlink}>
        {text}
      </Link>
    </li>
  );
}

export default FooterLinksLeft;
