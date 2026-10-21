import { JetBrains_Mono, Noto_Sans_JP } from "next/font/google";

/* tokens.css の --font-family-sans / --font-family-mono が参照する CSS 変数。
   layout.tsx（本番）と .storybook/preview.tsx（Storybook）の両方から同じ定義を使う */

export const notoSansJP = Noto_Sans_JP({
  // 可変フォントなので weight は指定しない（400 / 500 / 700 をこの 1 ファイルで賄う）
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${notoSansJP.variable} ${jetBrainsMono.variable}`;
