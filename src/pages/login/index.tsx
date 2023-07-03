import Head from "next/head";
import LoginForm from "~/components/LoginForm";
import LoginSwitch from "~/components/LoginSwitch";
import RegisterForm from "~/components/RegisterForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function index() {
  const router = useRouter();
  const [login, setLogin] = useState(true);

  const { data: session, status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "authenticated") {
    router.push("/home");
  }

  const toggleSwitch = () => {
    setLogin(!login);
  };

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Login</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/DesAIgnerIco.ico" />
        </Head>
        <main className="mb-[100px] mt-[100px] flex grow flex-col items-center justify-center font-coolveticaLight">
          <div className="flex h-full w-full items-center justify-center">
            {login ? <LoginForm /> : <RegisterForm />}
          </div>
          <LoginSwitch login={login} toggleSwitch={toggleSwitch} />
        </main>
      </>
    );
  }
}

export default index;
