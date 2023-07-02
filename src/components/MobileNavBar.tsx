import DesAIgnerLogo from "./DesAIgnerLogo"
import Link from "next/link";

function MobileNavBar() {
  return (
    <header className="flex justify-center items-center absolute top-0 w-full h-[140px] 480:h-[180px]">
        <nav className="480:scale-[1.4]">
          <Link href="/landing">
            <DesAIgnerLogo/>
          </Link>
        </nav>
    </header>
  )
}

export default MobileNavBar