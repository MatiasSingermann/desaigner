import Head from "next/head";
import GoogleButton from "~/components/GoogleButton";
import InputLoginButton from "~/components/InputLoginButton";
import SignButton from "~/components/SignButton";

function index() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by DesAIgner Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Login</div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-[568px] w-[335px] items-center justify-center rounded-3xl bg-[#009E95] px-[12px]">
            <form
              className="flex flex-col items-center justify-center"
              action="/home"
              method="POST"
            >
              {/* Fijarse si usar un form por SEO o solo inputs con un fetch */}
              <h2 className="h-[88px] w-[266px] text-center text-[35px] text-white">
                Regístrate en DesAIgner
              </h2>
              <div className="flex flex-col justify-center items-center mt-[33px] mb-[66px]">
                <InputLoginButton type="email" pholder="Email" />
                <InputLoginButton type="password" pholder="Contraseña" />
                <InputLoginButton
                  type="password"
                  pholder="Repetir contraseña"
                />
                <SignButton type="submit" text="Regístrate" />
              </div>
              <div className="flex flex-row items-center justify-center">
                <hr className="ml-12 mr-2 w-[136px] border-white" />
                <p className="text-[18px] text-white text-center">o</p>
                <hr className="ml-2 mr-12 w-[136px] border-white" />
              </div>
              <GoogleButton text="Registrarse con Google" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default index;
