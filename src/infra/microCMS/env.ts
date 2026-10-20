import { requireEnv } from "@/commons/env/requireEnv";

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
export const microCMSEnv = {
  get serviceDomain() {
    return requireEnv(
      "MICROCMS_SERVICE_DOMAIN",
      process.env.MICROCMS_SERVICE_DOMAIN,
    );
  },
  get apiKey() {
    return requireEnv("MICROCMS_API_KEY", process.env.MICROCMS_API_KEY);
  },
};
