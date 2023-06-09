import FacebookLogo from "./FacebookLogo";
import FooterLinksLeft from "./FooterLinksLeft";
import FooterLinksRight from "./FooterLinksRight";
import InstagramLogo from "./InstagramLogo";
import SocialMedia from "./SocialMedia";
import TwitterLogo from "./TwitterLogo";

function Footer() {
  return (
    <footer className="bottom-0 flex h-[140px] w-full bg-[#59C3C3] px-[14px] py-[16px] font-coolveticaBook">
      <div className="flex flex-col">
        <div className="flex w-full">
          <div className="flex flex-col">
            <div className="flex h-[60px] w-[110px] flex-col">
              <div className="h-[34px] w-[98px] font-coolveticaRegular text-[22.5px] text-[#FBF9FA]">
                DesAIgner
              </div>
              <ul className="-mx-[2px] flex h-[34px] w-[100px] items-center justify-between">
                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=mSUNnCwj1WY"
                  icon={<TwitterLogo />}
                />

                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  icon={<InstagramLogo />}
                />

                <SocialMedia
                  hlink="https://www.youtube.com/watch?v=qPCf1tS_AwM"
                  icon={<FacebookLogo />}
                />
              </ul>
            </div>
          </div>
          <div className="flex flex-col text-[9px] text-[#FBF9FA]">
            <ul className="ml-[80px] mt-[6px]">
              <FooterLinksLeft hlink="/" text="Contacto" />
              <FooterLinksLeft hlink="/about" text="Sobre Nosotros" />
            </ul>
          </div>
          <div className="flex flex-col text-[9px] text-[#FBF9FA]">
            <ul className="ml-[20px] mt-[6px]">
              <FooterLinksRight hlink="/" text="Inicio" />
              <FooterLinksRight hlink="/about" text="Login/Registrarse" />
              <FooterLinksRight hlink="/create" text="Generar" />
              <FooterLinksRight hlink="/collections" text="Carpetas" />
              <FooterLinksRight hlink="/settings" text="Configuración" />
            </ul>
          </div>
        </div>
        <div className="flex text-[9px] text-[#FBF9FA]">
          Copyright © DesAIgner, 2023, todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
