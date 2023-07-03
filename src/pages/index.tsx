import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from 'next/router'

const Home = () => {

  const router = useRouter()

  const { data: session, status } = useSession({
    required: false,
  })

  if (status === "unauthenticated") {
    router.push("/landing")
  }

  if (status === "loading") {
    return "Cargando..."
  }

  if (status === "authenticated") {
    router.push("/home")
  }

  return (
    <>
      <Head>
        <title>DesAIgner</title>
        <meta name="description" content="Generated by DesAIgner Team" />
        <link rel="icon" href="/DesAIgnerIco.ico" />
      </Head>
      <main>
      </main>
    </>
  );
};

export default Home;