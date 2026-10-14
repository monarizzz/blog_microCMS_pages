/**
 * microcms-js-sdk が「コンテンツが無い」ときに投げたエラーかを判定する。
 *
 * SDK はステータスを持つ専用のエラー型を出さず、
 * `fetch API response status: 404` という文言の Error を投げるだけなので、文言で見分ける。
 * 404 以外（認証エラーや 5xx、ネットワークエラー）まで notFound() に倒すと
 * 障害がページ不在に見えてしまうため、ここでは 404 だけを拾う。
 */
export const isNotFoundError = (error: unknown) =>
  error instanceof Error &&
  /^fetch API response status: 404\b/.test(error.message);
