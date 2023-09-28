import Head from "next/head";
import CompSlider from "~/components/CompSlider";
import Footer from "~/components/Footer";
import LandingButton from "~/components/LandingButton";
import SwiperSlider from "~/components/SwiperSlider";
import { motion } from "framer-motion";

const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 0.4 },
  variants: {
    visible: { opacity: 1, scale: 1, translateY: 0 },
    hidden: { opacity: 0, scale: 1, translateY: 22 },
  }
}

function Index() {
  return (
    <>
      <Head>
        <title>Landing</title>
        <meta name="description" content="Generated by DesAIgner Team" />
        <link rel="icon" href="/DesAIgnerIco.ico" />
      </Head>
      <main className="flex grow flex-col items-center justify-start font-coolveticaLight text-[#22302D] dark:text-[#FBF9FA]">
        <motion.h1
          {...motionProps}
          className="mx-[32px] mb-[52px] flex flex-wrap self-start font-coolveticaRegular text-[40px] leading-none"
        >
          <span>Des</span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            AI
          </span>
          <span>gner,&#160;</span>
          <span>la&#160;</span>
          <span>app&#160;</span>
          <span>de&#160;</span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            diseño&#160;
          </span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            de&#160;
          </span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            interiores
          </span>
        </motion.h1>
        <motion.h2
          {...motionProps}
          className="mx-[32px] mb-[36px] self-start font-coolveticaLight text-[20px] leading-none"
        >
          Con{" "}
          <span className="font-coolveticaBook">Inteligencia Artificial</span>,
          te ayudamos a crear el cuarto de tus sueños.
        </motion.h2>
        <LandingButton text="Pruébalo ya" color="bg-[#59C3C3]" link="/create" />
        <LandingButton
          text="Crea una cuenta"
          color="bg-[#228187]"
          link="/login"
        />
        <SwiperSlider />
        <motion.h1
          {...motionProps}
          className="mx-[32px] mb-[52px] flex flex-wrap self-start font-coolveticaRegular text-[40px] leading-none"
        >
          <span>Modifica&#160;</span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            virtualmente&#160;
          </span>
          <span>tu&#160;</span>
          <span>hogar</span>
        </motion.h1>
        <motion.h2
          {...motionProps}
          className="mx-[32px] mb-[52px] self-start font-coolveticaLight text-[20px] leading-none"
        >
          Toma una foto de tu cuarto, súbela y haremos todo el trabajo por tí.
          Elige el estilo del resultado como plazcas.
        </motion.h2>
        <CompSlider />
        <motion.h1
          {...motionProps}
          className="mx-[32px] mb-[52px] flex flex-wrap self-start font-coolveticaRegular text-[40px] leading-none"
        >
          <span>¿Cómo&#160;</span>
          <span className="bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text text-transparent">
            funciona?
          </span>
        </motion.h1>
        <motion.h2
          {...motionProps}
          className="mx-[32px] mb-[52px] self-start font-coolveticaLight text-[20px] leading-none"
        >
          Usamos Grounding DINO, Stable Diffusion y CLIP Interrogator para poder
          darle vida a nuestra idea.
        </motion.h2>
      </main>
      <Footer />
    </>
  );
}

export default Index;
