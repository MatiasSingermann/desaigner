import DesAIgnerLogo from "./DesAIgnerLogo";
import Link from "next/link";
import { useRouter } from "next/router";

function MobileNavBar() {
  const router = useRouter();
  return (
    <header
      className={`top-0 mb-[18px] flex w-full items-center border-b-[2px] border-[#D9D9D9] p-[24px] dark:border-black ${
        router.route == "/login" ? "justify-center" : ""
      }`}
    >
      <nav className="480:scale-[1.4]">
        <Link href="/landing" aria-label="Vuelve a Landing">
          <DesAIgnerLogo />
        </Link>
      </nav>
    </header>
  );
}

export default MobileNavBar;
