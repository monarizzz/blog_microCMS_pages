import type { Metadata } from "next";
import {
  siteDescription,
  siteLocale,
  siteName,
  siteUrl,
} from "@/commons/constants/site";
import "@/styles/globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+JP:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
