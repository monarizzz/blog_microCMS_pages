/**
 * microCMS クライアントに必要な環境変数を読み出す。
 *
 * 未設定のまま createClient に渡すと、microCMS への実リクエストが 401 で
 * 落ちるまで設定漏れに気付けない。ここで落として原因を明示する。
 *
 * 読み出しは getter にして、参照した時点で初めて評価する。
 * モジュール読み込み時に評価すると、import しただけで throw してしまい
 * 呼び出し側の try/catch では捕まえられない（client.ts のコメント参照）。
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
  get serviceDomain() {
    return requireEnv("MICROCMS_SERVICE_DOMAIN");
  },
  get apiKey() {
    return requireEnv("MICROCMS_API_KEY");
  },
};
