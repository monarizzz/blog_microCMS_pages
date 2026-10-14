import type { MicroCMSListContent } from "microcms-js-sdk";

import type {
  TimelineItem,
  TimelineProject,
} from "@/commons/profile/components/Timeline/Timeline";
import type { Experiences } from "@/infra/microCMS/schema/experiences";
import type { Milestone } from "@/infra/microCMS/schema/profile";

// microCMS の日付は JST 0 時を UTC で返す（例: 2024-10-05 → "2024-10-04T15:00:00.000Z"）。
// 文字列を slice すると月初の実績が前月にずれるため、JST に直してから年月を取る
const yearMonthFormat = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
});

const toJstParts = (iso: string) => {
  const parts = yearMonthFormat.formatToParts(new Date(iso));
  return {
    year: parts.find((part) => part.type === "year")?.value,
    month: parts.find((part) => part.type === "month")?.value,
  };
};

const toYearMonth = (iso: string) => {
  const { year, month } = toJstParts(iso);
  return `${year}.${month}`;
};

const toYear = (iso: string) => toJstParts(iso).year ?? "";

type Entry =
  | { date: string; milestone: Milestone; key: number }
  | { date: string; experience: Experiences & MicroCMSListContent };

const toProject = (
  experience: Experiences & MicroCMSListContent,
  index: number,
): TimelineProject => ({
  index: String(index).padStart(2, "0"),
  title: experience.title,
  category: experience.kind.join(" / "),
  description: experience.summary,
  // ServiceCard と同じく、トピック (記事用の分類) は技術スタックに出さない
  techStack: (experience.tags ?? [])
    .filter((tag) => !tag.type.includes("トピック"))
    .map((tag) => tag.name)
    .join(" / "),
  link: experience.hasDetailPage ? `/service/${experience.id}` : undefined,
});

/**
 * experiences（プロジェクト行）と profile.milestones（年＋名前だけの目盛り）を
 * 日付の昇順に 1 本の Timeline に並べる。同日は目盛りを先に置く
 */
export const toTimelineItems = (
  experiences: (Experiences & MicroCMSListContent)[],
  milestones?: Milestone[] | null,
): TimelineItem[] => {
  // 目盛りを先に連結し、安定ソートで同日の順序 (目盛り → 実績、各々は入力順) を保つ
  const entries: Entry[] = [
    ...(milestones ?? []).map((milestone, key) => ({
      date: milestone.date,
      milestone,
      key,
    })),
    ...experiences.map((experience) => ({
      date: experience.startDate,
      experience,
    })),
  ].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  let projectCount = 0;
  return entries.map((entry) => {
    if ("milestone" in entry) {
      return {
        // 繰り返しフィールドの要素は id を持たない。
        // microCMS のコンテンツ ID に使えない ":" を挟み、experiences の id と衝突させない
        id: `milestone:${entry.key}`,
        year: toYear(entry.date),
        title: entry.milestone.title,
        size: entry.milestone.emphasized ? "lg" : "sm",
      };
    }
    projectCount += 1;
    return {
      id: entry.experience.id,
      year: toYearMonth(entry.date),
      project: toProject(entry.experience, projectCount),
    };
  });
};
