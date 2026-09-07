import { createClient } from "microcms-js-sdk";

/**
 * microCMS クライアント。
 *
 * 環境変数名は README / `.env.example` の `MICROCMS_*` に合わせる。
 * 以前は `process.env.API_KEY` を読んでおり、README どおりに
 * `MICROCMS_API_KEY` だけを設定した環境では `createClient` が同期的に
 * 例外を投げていた（#283）。sitemap の静的生成からこのモジュールが
 * 到達可能になり `next build` が落ちるため、ここで揃える。
 *
 * `serviceDomain` もハードコードをやめて環境変数から読むが、
 * 未設定の既存環境を壊さないよう従来の値をフォールバックに残す。
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "1sdrqfaqhy",
  apiKey: process.env.MICROCMS_API_KEY!,
});
