import { describe, expect, it } from "vitest";

import { newerArticleQuery, olderArticleQuery } from "./adjacentArticleQueries";

const KEY = {
  publishedAt: "2026-02-03T06:13:21.705Z",
  createdAt: "2026-01-19T09:58:19.502Z",
};

describe("olderArticleQuery", () => {
  it("新しい順に並べ、公開日時が同じなら作成日時が古いものも含めて 1 件だけ引く", () => {
    expect(olderArticleQuery(KEY)).toEqual({
      limit: 1,
      fields: "id,title",
      orders: "-publishedAt,-createdAt",
      filters:
        "publishedAt[equals]2026-02-03T06:13:21.705Z[and]createdAt[less_than]2026-01-19T09:58:19.502Z" +
        "[or]publishedAt[less_than]2026-02-03T06:13:21.705Z",
    });
  });
});

describe("newerArticleQuery", () => {
  it("古い順に並べ、公開日時が同じなら作成日時が新しいものも含めて 1 件だけ引く", () => {
    expect(newerArticleQuery(KEY)).toEqual({
      limit: 1,
      fields: "id,title",
      orders: "publishedAt,createdAt",
      filters:
        "publishedAt[equals]2026-02-03T06:13:21.705Z[and]createdAt[greater_than]2026-01-19T09:58:19.502Z" +
        "[or]publishedAt[greater_than]2026-02-03T06:13:21.705Z",
    });
  });
});
