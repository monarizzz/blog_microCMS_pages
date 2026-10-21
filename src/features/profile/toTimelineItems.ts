import type { MicroCMSListContent } from "microcms-js-sdk";

import type {
  TimelineItem,
  TimelineProject,
} from "@/commons/profile/components/Timeline/Timeline";
import type { Experiences } from "@/infra/microCMS/schema/experiences";
import type { Milestone } from "@/infra/microCMS/schema/profile";
import { toJstYear, toJstYearMonth } from "@/commons/date/jstDate";

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
  // /service/[id] は hasDetailPage が偽の実績を 404 にするので、真のときだけリンクする
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
        year: toJstYear(entry.date),
        title: entry.milestone.title,
        size: entry.milestone.emphasized ? "lg" : "sm",
      };
    }
    projectCount += 1;
    return {
      id: entry.experience.id,
      year: toJstYearMonth(entry.date),
      project: toProject(entry.experience, projectCount),
    };
  });
};
