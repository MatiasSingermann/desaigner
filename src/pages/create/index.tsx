import Head from "next/head";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepShow from "~/components/StepShow";

function index() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated") {
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("mandar form");
    };
    return (
      <>
        <Head>
          <title>Create</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/DesAIgnerIco.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
          <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full"
          >
            <StepShow />
          </form>
        </main>
        <Footer />
      </>
    );
  }
}

export default index;
