/**
 * 公開サイトのオリジン（末尾スラッシュなし）を返す。
 *
 * SNS 共有やクリップボードへのコピーは絶対 URL を要求するため、
 * 相対パスでは代替できない。優先順は次の通り。
 *
 * 1. `NEXT_PUBLIC_SITE_URL` … 独自ドメインの正規オリジン。これが最優先
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` … Vercel の本番ドメイン（ホスト名のみ）
 * 3. `VERCEL_URL` … デプロイ固有のドメイン。プレビュー環境向け
 * 4. `http://localhost:3000` … ローカル
 *
 * 4 のフォールバックは、未設定でもローカル開発と Storybook が動くようにするため。
 * 本番で 1〜3 のいずれも無いと共有 URL が localhost を指すので、
 * デプロイ先の環境変数には必ず 1 を設定する。
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (vercelHost) {
    return `https://${vercelHost}`;
  }

  return "http://localhost:3000";
}
