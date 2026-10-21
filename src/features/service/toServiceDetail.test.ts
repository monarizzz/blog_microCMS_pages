import { describe, expect, it } from "vitest";

import { mockService, mockTag } from "./mocks/services";
import { toServiceDetail } from "./toServiceDetail";

const IMAGE = {
  url: "https://images.microcms-assets.io/hero.png",
  width: 1,
  height: 1,
};

describe("toServiceDetail", () => {
  it("タイトル・種別と開始年の Meta・概要・役割を写す", () => {
    const detail = toServiceDetail(
      mockService("weather", {
        kind: ["個人開発", "ハッカソン"],
        summary: "一言の説明",
        description: "開発の詳細",
        role: "設計 / 開発",
      }),
    );

    expect(detail).toMatchObject({
      title: "天気予報アプリ",
      meta: "個人開発 / ハッカソン · 2026",
      description: "一言の説明",
      overview: "開発の詳細",
      role: "設計 / 開発",
      features: [],
    });
  });

  it("リッチテキストの description は段落を空行で区切った平文にする", () => {
    const detail = toServiceDetail(
      mockService("weather", {
        description: "<p>一段目 &amp; 補足</p><p>二段目</p>",
      }),
    );

    expect(detail.overview).toBe("一段目 & 補足\n\n二段目");
  });

  it("空文字の summary / description / role は undefined にして節を出さない", () => {
    const detail = toServiceDetail(mockService("weather", { role: "" }));

    expect(detail.description).toBeUndefined();
    expect(detail.overview).toBeUndefined();
    expect(detail.role).toBeUndefined();
  });

  it("期間は JST の年月で、終了日と補足があれば繋げる", () => {
    // 2025-09-01 (JST) は UTC では前日の 15:00
    const start = "2025-08-31T15:00:00.000Z";

    expect(
      toServiceDetail(mockService("a", { startDate: start })).periodLabel,
    ).toBe("2025.09");
    expect(
      toServiceDetail(
        mockService("b", {
          startDate: start,
          endDate: "2025-11-30T15:00:00.000Z",
        }),
      ).periodLabel,
    ).toBe("2025.09 - 2025.12");
    expect(
      toServiceDetail(
        mockService("c", { startDate: start, periodLabel: "（開発中）" }),
      ).periodLabel,
    ).toBe("2025.09 （開発中）");
  });

  it("技術スタックはトピックを除き、同じ id の重複を 1 つにする", () => {
    const nextjs = mockTag("Next.js", ["フレームワーク"]);
    const detail = toServiceDetail(
      mockService("weather", {
        tags: [
          nextjs,
          mockTag("設計", ["トピック"]),
          mockTag("TypeScript", ["言語"]),
          nextjs,
        ],
      }),
    );

    expect(detail.techStack).toEqual(["Next.js", "TypeScript"]);
  });

  it("tags が null でも空の技術スタックにする", () => {
    expect(
      toServiceDetail(mockService("weather", { tags: null })).techStack,
    ).toEqual([]);
  });

  it("url は github.com を GitHub に、それ以外の最初の 1 件を URL に振り分ける", () => {
    const detail = toServiceDetail(
      mockService("weather", {
        url: [
          { fieldId: "url", url: "" },
          { fieldId: "url", url: "https://example.com" },
          { fieldId: "url", url: "https://github.com/example/weather" },
          { fieldId: "url", url: "https://example.org" },
        ],
      }),
    );

    expect(detail.githubUrl).toBe("https://github.com/example/weather");
    expect(detail.url).toBe("https://example.com");
  });

  it("URL として解釈できない値は GitHub ではなく URL 扱いにする", () => {
    const detail = toServiceDetail(
      mockService("weather", { url: [{ fieldId: "url", url: "not a url" }] }),
    );

    expect(detail.githubUrl).toBeUndefined();
    expect(detail.url).toBe("not a url");
  });

  it("ヒーロー画像は 1 枚目を使い、無ければ undefined", () => {
    expect(
      toServiceDetail(mockService("a", { heroImage: [IMAGE] })).heroImageUrl,
    ).toBe(IMAGE.url);
    expect(
      toServiceDetail(mockService("b", { heroImage: null })).heroImageUrl,
    ).toBeUndefined();
  });
});
