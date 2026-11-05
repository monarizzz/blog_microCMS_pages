import { requireEnv } from "@/commons/env/requireEnv";

/** NEXT_PUBLIC_SITE_URL 未設定のローカル開発で使う dev サーバの既定オリジン */
const devFallbackSiteUrl = "http://localhost:3000";

/**
 * サイトの絶対 URL。canonical / og:url / og:image / sitemap / robots の
 * 解決に使うため、本番でこれが localhost になると SNS のプレビューも
 * 検索エンジンの巡回も壊れる。
 *
 * 本番ビルド (NODE_ENV === "production") で未設定なら throw してビルドを
 * 落とす。ローカル開発では設定なしで動かしたいので localhost へ落とす。
 *
 * throw をサーバ側だけに限っているのは、この定数が Storybook のような
 * ブラウザ実行のバンドルにも取り込まれるため。Storybook のビルドは
 * NODE_ENV === "production" になるが、そこで落ちても設定漏れの検知には
 * ならず、ストーリーが全て開けなくなるだけなので除外している。
 */
function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;

  if (value !== undefined && value !== "") {
    return value;
  }

  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    return requireEnv("NEXT_PUBLIC_SITE_URL", value);
  }

  return devFallbackSiteUrl;
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Monelog";

export const siteDescription =
  "Monelog は、Web 開発の学びや作ったものを記録する個人ブログです。";

export const siteLocale = "ja_JP";
