import Link from "next/link";
import FacebookLogo from "./FacebookLogo";
import FooterLinksLeft from "./FooterLinksLeft";
import FooterLinksRight from "./FooterLinksRight";
import InstagramLogo from "./InstagramLogo";
import SocialMedia from "./SocialMedia";
import TwitterLogo from "./TwitterLogo";
import XLogo from "./XLogo";

function Footer() {
  return (
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
              <ul className="-ml-[2px] flex h-[34px] w-[100px] items-center justify-between 360:ml-[1px] 360:w-[140px] 480:ml-[4px] 720:ml-[6px] 720:w-[160px] 1080:w-[170px] 360:mt-[4px] 720:mt-[8px]">
                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=mSUNnCwj1WY"
                  alabel="Visita nuestro Twitter"
                  icon="./XLogo.svg"
                />

                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  alabel="Visita nuestro Instagram"
                  icon="./InstagramLogo.svg"
                />

                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=qPCf1tS_AwM"
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
              <FooterLinksRight hlink="/about" text="Login/Registrarse" />
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
  );
}

export default Footer;
