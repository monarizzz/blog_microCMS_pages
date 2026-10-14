import type { Tags } from "@/infra/microCMS/schema/tags";

import type { ServiceList } from "../types/ServiceCard";

/** ストーリー用のモック。microCMS の一覧レスポンスと同じ形にしている */

const LIST_CONTENT_DATES = {
  createdAt: "2026-07-25T15:54:26.220Z",
  updatedAt: "2026-07-25T17:39:25.055Z",
  publishedAt: "2026-07-25T15:54:26.220Z",
  revisedAt: "2026-07-25T17:39:25.055Z",
};

export const mockTag = (name: string, type: Tags["type"]) => ({
  ...LIST_CONTENT_DATES,
  id: name.toLowerCase().replace(/[^a-z0-9]/g, ""),
  name,
  type,
});

/** 必須項目だけを埋めた最小の Service。各ストーリーはここに差分を重ねる */
export const mockService = (
  id: string,
  overrides: Partial<ServiceList> = {},
): ServiceList => ({
  ...LIST_CONTENT_DATES,
  id,
  title: "天気予報アプリ",
  kind: ["個人開発"],
  hasDetailPage: false,
  summary: "",
  description: "",
  heroImage: [],
  tags: [
    mockTag("Next.js", ["フレームワーク"]),
    mockTag("TypeScript", ["言語"]),
    mockTag("microCMS", ["その他・ツール類"]),
  ],
  startDate: "2026-07-15T15:00:00.000Z",
  url: [],
  ...overrides,
});
