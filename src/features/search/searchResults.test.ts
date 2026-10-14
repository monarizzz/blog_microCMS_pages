import { describe, expect, it } from "vitest";

import {
  SEARCH_SUMMARY_MAX_LENGTH,
  toSearchResultArticle,
  toSearchSummary,
} from "./searchResults";

describe("toSearchSummary", () => {
  it("本文の HTML を、段落の区切りも空白 1 つに詰めた平文にする", () => {
    expect(
      toSearchSummary("<p>一段目 &amp; <strong>強調</strong></p><p>二段目</p>"),
    ).toBe("一段目 & 強調 二段目");
  });

  it("上限ちょうどの長さなら省略記号を付けない", () => {
    const text = "あ".repeat(SEARCH_SUMMARY_MAX_LENGTH);
    expect(toSearchSummary(`<p>${text}</p>`)).toBe(text);
  });

  it("上限を超えたら上限の文字数で切り、末尾に … を付ける", () => {
    const text = "あ".repeat(SEARCH_SUMMARY_MAX_LENGTH + 1);
    expect(toSearchSummary(`<p>${text}</p>`)).toBe(
      `${"あ".repeat(SEARCH_SUMMARY_MAX_LENGTH)}…`,
    );
  });

  it("サロゲートペアの文字も 1 文字と数え、途中で割らない", () => {
    const text = "🍣".repeat(SEARCH_SUMMARY_MAX_LENGTH + 1);
    expect(toSearchSummary(`<p>${text}</p>`)).toBe(
      `${"🍣".repeat(SEARCH_SUMMARY_MAX_LENGTH)}…`,
    );
  });

  it("本文が空なら空文字", () => {
    expect(toSearchSummary("")).toBe("");
  });
});

describe("toSearchResultArticle", () => {
  const article = {
    id: "abc",
    title: "タイトル",
    content: "<p>本文</p>",
    createdAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-02-01T00:00:00.000Z",
    tags: [{ name: "Next.js" }, { name: "設計" }],
  };

  it("本文を抜粋にし、タグは名前だけにする", () => {
    expect(toSearchResultArticle(article)).toEqual({
      id: "abc",
      title: "タイトル",
      summary: "本文",
      publishedAt: "2024-02-01T00:00:00.000Z",
      tags: ["Next.js", "設計"],
    });
  });

  it("publishedAt が無ければ createdAt で代える", () => {
    expect(
      toSearchResultArticle({ ...article, publishedAt: undefined }).publishedAt,
    ).toBe("2024-01-01T00:00:00.000Z");
  });
});
