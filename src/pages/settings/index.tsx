import Footer from "~/components/Footer";
import Head from "next/head";
import ThemeButton from "~/components/ThemeButton";
import { useSession } from "next-auth/react";

function Index() {
  const { status } = useSession({
    required: false,
  })

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Generated by DesAIgner Team" />
        <link rel="icon" href="/DesAIgnerIco.ico" />
      </Head>
      <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
        <ThemeButton/>
        {status === "authenticated" && "<componente/>"}
      </main>
      <Footer />
    </>
  );
}

export default Index;