import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from 'next/image';

type recentImg = {
  imagen : string,
}[];

function Index() {
  const router = useRouter();
  const [recentImgs, setRecentImgs] = useState<recentImg | undefined>();

  useEffect(() => {
    fetch("api/auth/diseniosRecientes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data : recentImg) => {
        // console.log(data);
        setRecentImgs(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const { status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "unauthenticated") {
    void router.push("/login");
  }

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Home</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
          <h1 className="mx-[32px] mb-[52px] self-start bg-gradient-to-tr from-[#228187] to-[#59C3C3] bg-clip-text font-coolveticaRegular text-[40px] leading-none text-transparent">
            Bienvenido
          </h1>
          <h2 className="mx-[32px] mb-[52px] self-start font-coolveticaRegular text-[35px] leading-none text-[#292F2D] dark:text-[#FBF9FA]">
            Tus diseños recientes
          </h2>
          <>
        {recentImgs?.map((source, i) => (
          <Image key={i} src={source.imagen} alt="Imagen" width={300} height={200} className="object-contain rounded-3xl flex mb-[80px]"/>
        ))}
      </>
        </main>
        <Footer />
      </>
    );
  }
}

export default Index;
