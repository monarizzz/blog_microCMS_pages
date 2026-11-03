/**
 * サイト全体のメタ情報。
 * URL は環境ごとに変わるため NEXT_PUBLIC_SITE_URL から読む。
 * 未設定なら Vercel が自動で注入する本番ドメインを使う。NEXT_PUBLIC_SITE_URL の
 * 設定漏れだけで og:url / og:image が localhost を指し、プレビューが出なくなるのを防ぐ。
 * どちらも無いローカル開発では dev サーバの既定オリジンにフォールバックする。
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionUrl
    ? `https://${vercelProductionUrl}`
    : "http://localhost:3000");

export const siteName = "Monelog";

export const siteDescription =
  "Monelog は、Web 開発の学びや作ったものを記録する個人ブログです。";

export const siteLocale = "ja_JP";
