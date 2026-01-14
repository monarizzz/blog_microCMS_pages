import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Karla } from "next/font/google";

const karla = Karla({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-karla",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={karla.variable}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
