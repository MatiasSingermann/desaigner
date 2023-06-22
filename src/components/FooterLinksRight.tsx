import Link from "next/link";

interface FooterLinksLeftProps {
  hlink: string;
  text: string;
}

function FooterLinksRight({ hlink, text }: FooterLinksLeftProps) {
  return (
    <li className="flex text-right items-center justify-end">
      <Link className="flex items-center justify-end p-[2px] text-[#FBF9FA] hover:text-[#E8E8E8] w-fit" href={hlink}>
        {text}
      </Link>
    </li>
  );
}

export default FooterLinksRight;
