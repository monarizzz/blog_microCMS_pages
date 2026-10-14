import { describe, expect, it } from "vitest";

import { mockService, mockTag } from "@/features/service/mocks/services";

import { mockArticle } from "./mocks/shelf";
import {
  toArticleShelf,
  toCoverTextSize,
  toServiceShelf,
} from "./toShelfItems";
import type { ShelfItem } from "./types/shelfItem";

const IMAGE = {
  url: "https://images.microcms-assets.io/hero.png",
  width: 1,
  height: 1,
};

const kinds = (items: ShelfItem[]) => items.map((item) => item.kind);
const books = (items: ShelfItem[]) =>
  items.filter(
    (item): item is Extract<ShelfItem, { kind: "book" }> =>
      item.kind === "book",
  );

describe("toCoverTextSize", () => {
  it.each([
    ["TS", "lg"],
    ["#", "lg"],
    ["あ", "lg"],
    ["Next", "md"],
    ["余白", "md"],
    ["小杉湯", "md"],
    ["どんどん", "sm"],
    ["Portalley", "sm"],
  ] as const)("pen の表紙文字 %s は %s", (text, size) => {
    expect(toCoverTextSize(text)).toBe(size);
  });
});

describe("toArticleShelf", () => {
  it("記事が無ければ空の棚にする（メモだけを並べない）", () => {
    expect(toArticleShelf([])).toEqual([]);
  });

  it("タイトルと JST の公開日を本に写し、記事詳細の接続まではリンクしない", () => {
    const [book] = toArticleShelf([
      mockArticle("app-router", {
        title: "App Router 移行",
        // JST では 2024-04-01 になる
        publishedAt: "2024-03-31T15:00:00.000Z",
      }),
    ]);

    expect(book).toMatchObject({
      kind: "book",
      title: "App Router 移行",
      meta: "2024.04.01 · Blog",
    });
    expect(book).not.toHaveProperty("href");
  });

  it("publishedAt が無ければ createdAt を公開日にする", () => {
    const [book] = toArticleShelf([
      mockArticle("draft", {
        publishedAt: undefined,
        createdAt: "2023-12-31T15:00:00.000Z",
      }),
    ]);

    expect(book).toMatchObject({ meta: "2024.01.01 · Blog" });
  });

  it("表紙文字は先頭のタグ名にし、文字幅で大きさを決める", () => {
    const [book] = toArticleShelf([
      mockArticle("a", {
        tags: [mockTag("TS", ["言語"]), mockTag("Next.js", ["フレームワーク"])],
      }),
    ]);

    expect(book).toMatchObject({ coverText: "TS", coverTextSize: "lg" });
  });

  it("タグが無ければタイトルを表紙文字にする", () => {
    const [book] = toArticleShelf([
      mockArticle("a", { title: "静的サイトという選択", tags: [] }),
    ]);

    expect(book).toMatchObject({
      coverText: "静的サイトという選択",
      coverTextSize: "sm",
    });
  });

  it("pen の並びどおり 1 冊目のあとにメモを 1 枚だけ挟む", () => {
    const articles = Array.from({ length: 6 }, (_, i) => mockArticle(`a${i}`));

    expect(kinds(toArticleShelf(articles))).toEqual([
      "book",
      "note",
      "book",
      "book",
      "book",
      "book",
      "book",
    ]);
  });

  it("本が 1 冊ならメモを置かない", () => {
    expect(kinds(toArticleShelf([mockArticle("a")]))).toEqual(["book"]);
  });

  it("本の見た目は pen の 5 冊を周期的に繰り返す", () => {
    const articles = Array.from({ length: 6 }, (_, i) => mockArticle(`a${i}`));
    const [first, second, , , , sixth] = books(toArticleShelf(articles));

    expect(first).toMatchObject({
      cover: "muted",
      coverHeight: "lg",
      accent: "muted",
      size: "lg",
    });
    expect(second).toMatchObject({
      cover: "info",
      coverHeight: "sm",
      accent: "primary",
      size: "md",
    });
    expect(sixth).toMatchObject({
      cover: first.cover,
      coverHeight: first.coverHeight,
      accent: first.accent,
      size: first.size,
    });
  });
});

describe("toServiceShelf", () => {
  it("実績が無ければ空の棚にする", () => {
    expect(toServiceShelf([])).toEqual([]);
  });

  it("タイトル・JST の開始年と種別・詳細ページへのリンクを本に写す", () => {
    const [, book] = toServiceShelf([
      mockService("kiso", {
        title: "KISO",
        kind: ["個人開発", "ハッカソン"],
        hasDetailPage: true,
        // JST では 2024-01-01 になる
        startDate: "2023-12-31T15:00:00.000Z",
      }),
    ]);

    expect(book).toMatchObject({
      kind: "book",
      title: "KISO",
      meta: "2024 | 個人開発 / ハッカソン",
      href: "/service/kiso",
      coverText: "KISO",
    });
  });

  it("hasDetailPage が偽ならリンクにしない", () => {
    const [, book] = toServiceShelf([mockService("a")]);

    expect(book).toMatchObject({ kind: "book", href: undefined });
  });

  it("heroImage があれば先頭の画像を表紙にする", () => {
    const [, book] = toServiceShelf([mockService("a", { heroImage: [IMAGE] })]);

    expect(book).toMatchObject({ coverImageUrl: IMAGE.url });
  });

  it("heroImage が空・null なら表紙画像を持たない", () => {
    const [, empty] = toServiceShelf([mockService("a", { heroImage: [] })]);
    const [, missing] = toServiceShelf([mockService("a", { heroImage: null })]);

    expect(empty).toMatchObject({ coverImageUrl: undefined });
    expect(missing).toMatchObject({ coverImageUrl: undefined });
  });

  it("pen の並びどおり先頭と 2 冊目のあとにメモを挟む", () => {
    const services = Array.from({ length: 4 }, (_, i) => mockService(`s${i}`));

    expect(kinds(toServiceShelf(services))).toEqual([
      "note",
      "book",
      "book",
      "note",
      "book",
      "book",
    ]);
  });

  it("手前に来る本が無いメモは置かず、棚をメモで終わらせない", () => {
    const services = Array.from({ length: 2 }, (_, i) => mockService(`s${i}`));

    expect(kinds(toServiceShelf(services))).toEqual(["note", "book", "book"]);
  });
});
