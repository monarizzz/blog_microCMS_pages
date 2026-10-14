import type { MicroCMSQueries } from "microcms-js-sdk";

/** 記事の並び順を決める 2 つの日時。一覧と同じく publishedAt、同値なら createdAt で並べる */
export type ArticleOrderKey = {
  publishedAt: string;
  createdAt: string;
};

const ADJACENT_FIELDS = "id,title";

/**
 * 「並び順で隣にある」ことを表す filters。
 *
 * publishedAt が同じ記事（一括で公開し直した記事は同じ日時になる）を
 * `publishedAt[less_than]` だけで探すと飛ばしてしまうため、同値のときは createdAt で比べる。
 * microCMS の filters は括弧が書けず、`[and]` `[or]` は左から順に結合される
 * （`A[or]B[and]C` は `(A or B) and C` になることを旧 blog API で確かめた）。
 * そのため `[and]` の組を先に書き、`(同値 and createdAt で前後) or publishedAt で前後` の順にする
 */
const adjacentFilters = (
  { publishedAt, createdAt }: ArticleOrderKey,
  comparison: "less_than" | "greater_than",
) =>
  `publishedAt[equals]${publishedAt}[and]createdAt[${comparison}]${createdAt}` +
  `[or]publishedAt[${comparison}]${publishedAt}`;

/** 1 つ古い記事（前の記事）を 1 件だけ引くクエリ */
export const olderArticleQuery = (key: ArticleOrderKey): MicroCMSQueries => ({
  limit: 1,
  fields: ADJACENT_FIELDS,
  orders: "-publishedAt,-createdAt",
  filters: adjacentFilters(key, "less_than"),
});

/** 1 つ新しい記事（次の記事）を 1 件だけ引くクエリ */
export const newerArticleQuery = (key: ArticleOrderKey): MicroCMSQueries => ({
  limit: 1,
  fields: ADJACENT_FIELDS,
  orders: "publishedAt,createdAt",
  filters: adjacentFilters(key, "greater_than"),
});
