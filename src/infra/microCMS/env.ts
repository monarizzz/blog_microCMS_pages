/**
 * microCMS クライアントに必要な環境変数を読み出す。
 *
 * 未設定のまま createClient に渡すと、microCMS への実リクエストが 401 で
 * 落ちるまで設定漏れに気付けない。ここでモジュール読み込み時に落として
 * 原因を明示する。client.ts はサーバー側でのみ import されるため、
 * throw はビルド時（generateStaticParams など）か SSR 時に発生する。
 */
function requireEnv(name: string): string {
  const value = process.env[name];

  if (value === undefined || value === "") {
    throw new Error(
      `環境変数 ${name} が設定されていません。.env.example を参照して設定してください（ローカルは .env.local、CI は Actions secrets、本番は Vercel の Environment Variables）。`,
    );
  }

  return value;
}

export const microCMSEnv = {
  serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
  apiKey: requireEnv("MICROCMS_API_KEY"),
};
