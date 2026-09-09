import { createClient } from "microcms-js-sdk";

import { microCMSEnv } from "./env";

let cachedClient: ReturnType<typeof createClient> | undefined;

/**
 * microCMS クライアントを取得する。
 *
 * モジュール読み込み時に生成すると、環境変数が未設定の環境では
 * import した時点で throw する。呼び出し側の try/catch より前に起きるため
 * フォールバックが効かず、`sitemap.ts` のように取得失敗を許容したい
 * ルートでも `next build` が page data の収集で失敗する。
 * 生成を初回呼び出しまで遅らせ、throw を呼び出し側で捕まえられる位置に置く。
 */
export const getClient = () => {
  cachedClient ??= createClient({
    serviceDomain: microCMSEnv.serviceDomain,
    apiKey: microCMSEnv.apiKey,
  });

  return cachedClient;
};
