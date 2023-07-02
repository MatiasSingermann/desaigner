import Head from "next/head";
import Footer from "~/components/Footer";

function index() {
  return (
    <>
      <Head>
        <title>Collections</title>
        <meta name="description" content="Generated by DesAIgner Team" />
        <link rel="icon" href="/DesAIgnerIco.ico" />
      </Head>
      <main>
        <div>Collections</div>
      </main>
      <Footer/>
    </>
  );
}

export default index;