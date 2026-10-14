import { describe, expect, it } from "vitest";

import {
  articleListOffset,
  resolveArticleListRange,
} from "./articleListPagination";

describe("articleListOffset", () => {
  it("1 ページ目は 0、以降は 1 ページの件数ずつ進む", () => {
    expect(articleListOffset(1)).toBe(0);
    expect(articleListOffset(3)).toBe(30);
  });
});

describe("resolveArticleListRange", () => {
  it("途中のページは 1 ページ分の範囲を返す", () => {
    expect(resolveArticleListRange(2, 38)).toEqual({
      totalPages: 3,
      start: 16,
      end: 30,
    });
  });

  it("最終ページは端数で終わる", () => {
    expect(resolveArticleListRange(3, 38)).toEqual({
      totalPages: 3,
      start: 31,
      end: 38,
    });
  });

  it("件数がちょうど割り切れるときは余分なページを作らない", () => {
    expect(resolveArticleListRange(2, 30).totalPages).toBe(2);
  });

  it("記事が 0 件でも総ページ数は 1 で、範囲は 0–0", () => {
    expect(resolveArticleListRange(1, 0)).toEqual({
      totalPages: 1,
      start: 0,
      end: 0,
    });
  });
});
