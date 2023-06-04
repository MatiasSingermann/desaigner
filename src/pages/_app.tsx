import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Footer from "~/components/Footer";
import MobileNavBar from "~/components/MobileNavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MobileNavBar/>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
