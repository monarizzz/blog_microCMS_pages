import type { MicroCMSListContent } from "microcms-js-sdk";

import { toJstYear, toJstYearMonth } from "@/commons/date/jstDate";
import { richTextToPlainText } from "@/infra/microCMS/richTextToPlainText";
import type { Experiences } from "@/infra/microCMS/schema/experiences";

import type { ServiceDetail } from "./components/ServiceDetailMain/ServiceDetailMain";

const isGitHubUrl = (href: string) => {
  try {
    return new URL(href).hostname === "github.com";
  } catch {
    return false;
  }
};

/** `2024.01 - 2024.04（約3か月）` の形。終了日も補足も任意 */
const toPeriodLabel = (experience: Experiences) => {
  const start = toJstYearMonth(experience.startDate);
  const range = experience.endDate
    ? `${start} - ${toJstYearMonth(experience.endDate)}`
    : start;
  return experience.periodLabel ? `${range} ${experience.periodLabel}` : range;
};

/** experiences の 1 件を Service 詳細ページの表示データにする */
export const toServiceDetail = (
  experience: Experiences & MicroCMSListContent,
): ServiceDetail => {
  const links = (experience.url ?? []).map((link) => link.url).filter(Boolean);
  // 複数参照は同じタグを重ねて選べるため、名前が 2 回並ばないよう id で除く
  const seenTagIds = new Set<string>();

  return {
    title: experience.title,
    // pen の Meta 行（「個人開発 · 2024 · フルスタック」）の 3 つ目は role 相当だが、
    // role はサイドバーの ROLE 行に出すので、ここでは種別と開始年だけにする
    meta: [experience.kind.join(" / "), toJstYear(experience.startDate)].join(
      " · ",
    ),
    description: experience.summary || undefined,
    heroImageUrl: experience.heroImage?.[0]?.url,
    // experiences に「主な機能」に当たるフィールドが無い。空なら節ごと出さない
    features: [],
    // description はリッチエディタの HTML。ServiceDetailMain は平文を改行込みで出す
    overview: richTextToPlainText(experience.description ?? "") || undefined,
    // ServiceCard と同じく、トピック (記事用の分類) は技術スタックに出さない
    techStack: (experience.tags ?? [])
      .filter((tag) => {
        if (seenTagIds.has(tag.id)) return false;
        seenTagIds.add(tag.id);
        return !tag.type.includes("トピック");
      })
      .map((tag) => tag.name),
    periodLabel: toPeriodLabel(experience),
    role: experience.role || undefined,
    // url は種別を持たないので、ServiceCard と同じくホストで GitHub を見分ける
    githubUrl: links.find(isGitHubUrl),
    url: links.find((href) => !isGitHubUrl(href)),
  };
};
