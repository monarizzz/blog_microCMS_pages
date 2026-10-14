import type { TimelineItem } from "@/commons/profile/components/Timeline/Timeline";
import type { Profile } from "@/infra/microCMS/schema/profile";
import { mockTag } from "@/features/service/mocks/services";

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
};

const projectDescription =
  "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。";

export const mockTimeline: TimelineItem[] = [
  { id: "clip-studio-paint", year: "2020", title: "Clip Studio Paint" },
  { id: "blender", year: "2021", title: "Blender" },
  { id: "live2d-cubism", year: "2022", title: "Live2D Cubism" },
  { id: "nextjs", year: "2024", title: "Next.js / TypeScript", size: "lg" },
  {
    id: "blog",
    year: "2025.09",
    project: {
      index: "01",
      title: "ブログサイト",
      category: "個人開発",
      description: projectDescription,
      techStack: "Next.js / TypeScript / microCMS",
    },
  },
  {
    id: "teamlab",
    year: "2025.09",
    project: {
      index: "02",
      title: "チームラボ",
      category: "インターン",
      description: projectDescription,
      techStack: "Next.js / TypeScript / SCSS / StoryBook",
    },
  },
];
