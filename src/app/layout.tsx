import type { Metadata } from "next";
import {
  siteDescription,
  siteLocale,
  siteName,
  siteUrl,
} from "@/commons/constants/site";
import { fontVariables } from "./_styles/fonts";
import "./_styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: siteLocale,
    url: "/",
    title: siteName,
    description: siteDescription,
  },
  // title / description は敢えて持たせない。ここで指定すると全ページに
  // 継承されてしまうため、X 側の og フォールバックに任せてページ固有の
  // og:title / og:description を拾わせる
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
