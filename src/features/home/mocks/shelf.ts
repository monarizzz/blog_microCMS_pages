import type { MicroCMSListContent } from "microcms-js-sdk";

import { mockService, mockTag } from "@/features/service/mocks/services";
import type { Article } from "@/infra/microCMS/schema/article";

/** ストーリーとテスト用のモック。microCMS の一覧レスポンスと同じ形にしている */

type ArticleList = Article & MicroCMSListContent;

/** 必須項目だけを埋めた最小の記事。各ストーリー・テストはここに差分を重ねる */
export const mockArticle = (
  id: string,
  overrides: Partial<ArticleList> = {},
): ArticleList => ({
  id,
  createdAt: "2024-03-18T03:00:00.000Z",
  updatedAt: "2024-03-18T03:00:00.000Z",
  publishedAt: "2024-03-18T03:00:00.000Z",
  revisedAt: "2024-03-18T03:00:00.000Z",
  title: "Next.js 14 App Router 移行の勘所",
  tags: [mockTag("Next.js", ["フレームワーク"])],
  content: "",
  ...overrides,
});

/** pen `hdLAj` の Blog の段に並ぶ 5 冊を、新しい順の記事にしたもの */
export const mockShelfArticles: ArticleList[] = [
  mockArticle("app-router"),
  mockArticle("typed-components", {
    title: "型で守るコンポーネント設計",
    publishedAt: "2024-02-06T03:00:00.000Z",
    tags: [mockTag("TS", ["言語"])],
  }),
  mockArticle("whitespace", {
    title: "余白のデザイン、その効能",
    publishedAt: "2024-01-22T03:00:00.000Z",
    tags: [mockTag("余白", ["トピック"])],
  }),
  mockArticle("static-site", {
    title: "静的サイトという選択",
    publishedAt: "2023-12-10T03:00:00.000Z",
    tags: [mockTag("#", ["トピック"])],
  }),
  mockArticle("typography", {
    title: "日本語タイポグラフィの基礎",
    publishedAt: "2023-11-04T03:00:00.000Z",
    tags: [mockTag("あ", ["トピック"])],
  }),
];

/** pen `hdLAj` の Service の段に並ぶ 4 冊を、詳細ページのある実績にしたもの */
export const mockShelfServices = [
  mockService("kosugiyu", {
    title: "小杉湯",
    kind: ["受託"],
    hasDetailPage: true,
    startDate: "2024-03-31T15:00:00.000Z",
  }),
  mockService("dondon", {
    title: "麻婆食堂 DONDON",
    kind: ["受託"],
    hasDetailPage: true,
    startDate: "2024-01-31T15:00:00.000Z",
  }),
  mockService("kiso", {
    title: "KISO",
    kind: ["個人開発"],
    hasDetailPage: true,
    startDate: "2023-12-31T15:00:00.000Z",
  }),
  mockService("portalley", {
    title: "Portalley",
    kind: ["ハッカソン"],
    hasDetailPage: true,
    startDate: "2023-06-30T15:00:00.000Z",
  }),
];
