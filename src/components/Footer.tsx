import Link from "next/link";
import FooterLinksLeft from "./FooterLinksLeft";
import FooterLinksRight from "./FooterLinksRight";
import SocialMedia from "./SocialMedia";

function Footer() {
  return (
    <>
      <footer className="md:px-[28px] md:py-[32px] bottom-0 flex w-full items-center justify-center bg-[#59C3C3] px-[14px] py-[16px] font-coolveticaBook dark:bg-[#009E95]">
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="relative font-coolveticaRegular text-[22.5px] text-[#FBF9FA] hover:text-[#E8E8E8] 360:text-[30px] 720:text-[40px]">
                  <Link className="-m-[8px] p-[8px]" href="/landing">
                    DesAIgner
                  </Link>
                </div>
                <ul className="-ml-[2px] flex h-[34px] w-[100px] items-center justify-between 360:ml-[1px] 360:mt-[4px] 360:w-[140px] 480:ml-[4px] 720:ml-[6px] 720:mt-[8px] 720:w-[160px] 1080:w-[170px]">
                  <SocialMedia
                    hlink="https://www.x.com/"
                    alabel="Visita nuestro Twitter"
                    icon="./XLogo.svg"
                  />

                  <SocialMedia
                    hlink="https://www.instagram.com/"
                    alabel="Visita nuestro Instagram"
                    icon="./InstagramLogo.svg"
                  />

                  <SocialMedia
                    hlink="https://www.facebook.com/"
                    alabel="Visita nuestro Facebook"
                    icon="./FacebookLogo.svg"
                  />
                </ul>
              </div>
            </div>
            <div className="flex flex-col text-[9px] text-[#FBF9FA] 360:text-[14px] 720:text-[18px]">
              <ul className="ml-[80px] mt-[6px] 360:ml-[280px] 480:ml-[350px] 720:ml-[420px]">
                <FooterLinksLeft hlink="/" text="Contacto" />
                <FooterLinksLeft hlink="/about" text="Sobre Nosotros" />
              </ul>
            </div>
            <div className="flex flex-col text-[9px] text-[#FBF9FA] 360:text-[14px] 720:text-[18px]">
              <ul className="ml-[20px] mt-[6px] 360:ml-[36px] 720:ml-[48px]">
                <FooterLinksRight hlink="/" text="Inicio" />
                <FooterLinksRight hlink="/login" text="Login/Registrarse" />
                <FooterLinksRight hlink="/create" text="Generar" />
                <FooterLinksRight hlink="/collections" text="Carpetas" />
                <FooterLinksRight hlink="/settings" text="Configuración" />
              </ul>
            </div>
          </div>
          <div className="flex text-[9px] text-[#FBF9FA] 360:text-[14px] 720:text-[18px]">
            Copyright © DesAIgner, 2023, todos los derechos reservados.
          </div>
        </div>
      </footer>
      <div className="flex bottom-0 h-[80px] w-full bg-[#59C3C3] dark:bg-[#009E95] 480:hidden"></div>
    </>
  );
}

export default Footer;
