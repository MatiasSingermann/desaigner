import Link from "next/link";

interface FooterLinksLeftProps {
  hlink: string;
  text: string;
}

function FooterLinksRight({ hlink, text }: FooterLinksLeftProps) {
  return (
    <li>
      <Link className="flex items-center justify-end p-[2px] text-right" href={hlink}>
        {text}
      </Link>
    </li>
  );
}

export default FooterLinksRight;
