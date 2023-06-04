import Link from 'next/link'

interface FooterLinksLeftProps {
  hlink: string;
  text: string;
}

function FooterLinksLeft({ hlink, text }: FooterLinksLeftProps) {
  return (
    <li>
      <Link className="flex items-center justify-start p-[2px] text-left" href={hlink}>
        {text}
      </Link>
    </li>
  );
}

export default FooterLinksLeft;
