/**
 * サイト全体のメタ情報。
 * URL は環境ごとに変わるため NEXT_PUBLIC_SITE_URL から読む。
 * 未設定のローカル開発では dev サーバの既定オリジンにフォールバックする。
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteName = "Monelog";

export const siteDescription =
  "Monelog は、Web 開発の学びや作ったものを記録する個人ブログです。";

export const siteLocale = "ja_JP";
