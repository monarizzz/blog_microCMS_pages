import type { MicroCMSListContent } from "microcms-js-sdk";

import type { TimelineItem } from "@/commons/profile/components/Timeline/Timeline";
import type { Experiences } from "@/infra/microCMS/schema/experiences";

// microCMS の日付は JST 0 時を UTC で返す（例: 2024-10-05 → "2024-10-04T15:00:00.000Z"）。
// 文字列を slice すると月初の実績が前月にずれるため、JST に直してから年月を取る
const yearMonthFormat = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
});

const toYearMonth = (iso: string) => {
  const parts = yearMonthFormat.formatToParts(new Date(iso));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  return `${year}.${month}`;
};

/** startDate 昇順に並んだ experiences を、1 件 1 行のプロジェクト行に変換する */
export const toTimelineItems = (
  experiences: (Experiences & MicroCMSListContent)[],
): TimelineItem[] =>
  experiences.map((experience, i) => ({
    id: experience.id,
    year: toYearMonth(experience.startDate),
    project: {
      index: String(i + 1).padStart(2, "0"),
      title: experience.title,
      category: experience.kind.join(" / "),
      description: experience.summary,
      // ServiceCard と同じく、トピック (記事用の分類) は技術スタックに出さない
      techStack: (experience.tags ?? [])
        .filter((tag) => !tag.type.includes("トピック"))
        .map((tag) => tag.name)
        .join(" / "),
      // TODO(#385): /service/[id] が microCMS に接続されたら、hasDetailPage の
      // 実績を `/service/${experience.id}` へリンクする。今の詳細ルートは仮置きの
      // id しか解決せず、実データの id へリンクすると必ず 404 になるため出さない
    },
  }));
