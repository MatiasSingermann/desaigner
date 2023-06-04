import DesAIgnerLogo from "./DesAIgnerLogo"

function MobileNavBar() {
  return (
    <header className="flex justify-center items-center absolute top-0 w-full h-[100px]">
        <nav>
            <DesAIgnerLogo/>
        </nav>
    </header>
  )
}

export default MobileNavBar