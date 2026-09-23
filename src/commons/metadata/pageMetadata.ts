import type { Metadata } from "next";
import { siteLocale, siteName } from "@/commons/constants/site";

/**
 * 既定 OGP 画像。`src/app/opengraph-image.tsx` が生成するルート。
 *
 * ファイル規約による画像は、そのページが `openGraph` を持たない場合しか
 * 自動で入らない。`buildPageMetadata` を使うページはここで `openGraph` を
 * 丸ごと差し替えるため、明示的に指し直さないと子ページの og:image と
 * twitter:image が両方消える（`next start` で実測）。
 */
const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteName,
};

type Args = {
  /** ページ固有のタイトル。`%s | Monelog` のテンプレートに流し込まれる */
  title: string;
  description: string;
  /** サイトルートからの相対パス。canonical と og:url に使う */
  path: string;
  /** 記事詳細のみ article を渡す。既定は website */
  type?: "website" | "article";
  /**
   * インデックスさせたくないページのみ渡す。既定は未指定 =
   * ルートの metadata (= 全ページ index 可) をそのまま継承する。
   */
  robots?: Metadata["robots"];
};

/**
 * ページ固有の metadata を組み立てる。
 *
 * Next.js の metadata はフィールド単位の浅いマージで、子が `openGraph` を
 * 持つと親の `openGraph` は丸ごと置き換わる。`siteName` / `locale` /
 * `type` を各ページで書き漏らすとそこだけ欠落するため、ここで必ず埋める。
 * `twitter` はルートの summary_large_image をそのまま継承させたいので触らない。
 */
export const buildPageMetadata = ({
  title,
  description,
  path,
  type = "website",
  robots,
}: Args): Metadata => ({
  title,
  description,
  openGraph: {
    type,
    siteName,
    locale: siteLocale,
    title: `${title} | ${siteName}`,
    description,
    url: path,
    images: [defaultOgImage],
  },
  alternates: {
    canonical: path,
  },
  // 未指定のページに `robots: undefined` を残すと、Next.js が
  // 「明示的に空を指定した」と解釈しうるためキー自体を生やさない
  ...(robots ? { robots } : {}),
});
