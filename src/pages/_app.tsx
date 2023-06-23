import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Footer from "~/components/Footer";
import MobileNavBar from "~/components/MobileNavBar";

import { ThemeProvider } from "next-themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session} refetchInterval={15*60} refetchOnWindowFocus={true}>
        <MobileNavBar />
        <div className="flex min-h-screen flex-col bg-[#FBF9FA] text-[#22302D] dark:bg-[#1B1F1F] dark:text-[#FBF9FA]">
          <Component {...pageProps} />
          <Footer />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
