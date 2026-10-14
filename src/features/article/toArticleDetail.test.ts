import type { MicroCMSListContent } from "microcms-js-sdk";
import { describe, expect, it } from "vitest";

import type { Article } from "@/infra/microCMS/schema/article";

import { toArticleDetail } from "./toArticleDetail";

const tag = (id: string, name: string) => ({
  id,
  name,
  type: ["トピック" as const],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

const mockArticle = (
  overrides: Partial<Article & MicroCMSListContent> = {},
): Article & MicroCMSListContent => ({
  id: "abc",
  title: "Treasure体験記",
  tags: [tag("dev", "開発"), tag("next", "Next.js")],
  content: '<h2 id="ha">背景</h2><p>本文</p>',
  createdAt: "2026-08-30T10:00:00.000Z",
  updatedAt: "2026-09-02T09:28:02.656Z",
  publishedAt: "2026-09-02T09:28:02.656Z",
  revisedAt: "2026-09-02T09:28:02.656Z",
  ...overrides,
});

describe("toArticleDetail", () => {
  it("タイトル・タグ名・公開日・本文ブロックを写す", () => {
    expect(toArticleDetail(mockArticle())).toEqual({
      title: "Treasure体験記",
      tags: ["開発", "Next.js"],
      publishedAt: "2026-09-02T09:28:02.656Z",
      publishedDate: "2026.09.02",
      blocks: [
        { type: "heading2", id: "ha", text: "背景" },
        { type: "paragraph", content: [{ text: "本文" }] },
      ],
    });
  });

  it("公開日は JST の日付にする（UTC では前日の日時）", () => {
    const detail = toArticleDetail(
      mockArticle({ publishedAt: "2026-10-04T15:00:00.000Z" }),
    );

    expect(detail.publishedDate).toBe("2026.10.05");
  });

  it("publishedAt が無ければ createdAt を公開日に使う", () => {
    const detail = toArticleDetail(mockArticle({ publishedAt: undefined }));

    expect(detail).toMatchObject({
      publishedAt: "2026-08-30T10:00:00.000Z",
      publishedDate: "2026.08.30",
    });
  });

  it("同じタグが重ねて選ばれていても 1 回だけ出す", () => {
    const detail = toArticleDetail(
      mockArticle({
        tags: [tag("dev", "開発"), tag("dev", "開発"), tag("next", "Next.js")],
      }),
    );

    expect(detail.tags).toEqual(["開発", "Next.js"]);
  });
});
