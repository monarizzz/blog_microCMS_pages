import type { TimelineItem } from "@/commons/profile/components/Timeline/Timeline";
import type { Profile } from "@/infra/microCMS/schema/profile";
import { mockService, mockTag } from "@/features/service/mocks/services";

import { toTimelineItems } from "../toTimelineItems";

/** ストーリー用のモック。microCMS のオブジェクト形式レスポンスと同じ形にしている */
export const mockProfile: Profile = {
  createdAt: "2026-07-25T15:54:26.220Z",
  updatedAt: "2026-07-25T17:39:25.055Z",
  publishedAt: "2026-07-25T15:54:26.220Z",
  revisedAt: "2026-07-25T17:39:25.055Z",
  name: "Ccc",
  bio: "情報系の大学生 フロント中心に開発してます",
  // ui.pen の StackList (WCc4s) の 3 行を再現する。実データと同じく Next.js を重複参照させている
  tags: [
    mockTag("Next.js(App・Pages)", ["フレームワーク"]),
    mockTag("TypeScript", ["言語"]),
    mockTag("Next.js(App・Pages)", ["フレームワーク"]),
    mockTag("React", ["ライブラリ"]),
    mockTag("GitHub", ["その他・ツール類"]),
    mockTag("Vercel", ["その他・ツール類"]),
    mockTag("Clip Studio Paint", ["その他・ツール類"]),
    mockTag("Live2D Cubism", ["その他・ツール類"]),
    mockTag("Blender", ["その他・ツール類"]),
  ],
  // pen の ToolList (j2ccOZ) と YBl0K の目盛り。日付は JST の 4/1 を UTC で表したもの
  milestones: [
    {
      fieldId: "milestone",
      date: "2020-03-31T15:00:00.000Z",
      title: "Clip Studio Paint",
    },
    {
      fieldId: "milestone",
      date: "2021-03-31T15:00:00.000Z",
      title: "Blender",
    },
    {
      fieldId: "milestone",
      date: "2022-03-31T15:00:00.000Z",
      title: "Live2D Cubism",
    },
    {
      fieldId: "milestone",
      date: "2024-03-31T15:00:00.000Z",
      title: "Next.js / TypeScript",
      emphasized: true,
    },
  ],
};

const projectDescription =
  "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。";

/** startDate 昇順の experiences 一覧レスポンス（page.tsx の取得条件と同じ並び） */
export const mockExperiences = [
  mockService("blog", {
    title: "ブログサイト",
    kind: ["個人開発"],
    summary: projectDescription,
    startDate: "2025-08-31T15:00:00.000Z",
  }),
  mockService("teamlab", {
    title: "チームラボ",
    kind: ["インターン"],
    summary: projectDescription,
    tags: [
      mockTag("Next.js", ["フレームワーク"]),
      mockTag("TypeScript", ["言語"]),
      mockTag("SCSS", ["言語"]),
      mockTag("StoryBook", ["その他・ツール類"]),
    ],
    startDate: "2025-08-31T15:00:00.000Z",
  }),
];

// 手書きせず page.tsx と同じ変換を通し、ストーリーで目盛りと実績の混ぜ方も確認できるようにする
export const mockTimeline: TimelineItem[] = toTimelineItems(
  mockExperiences,
  mockProfile.milestones,
);
