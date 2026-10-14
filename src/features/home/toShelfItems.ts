import type { MicroCMSListContent } from "microcms-js-sdk";

import { toJstDate, toJstYear } from "@/commons/date/jstDate";
import type { Article } from "@/infra/microCMS/schema/article";
import type { Experiences } from "@/infra/microCMS/schema/experiences";

import type {
  ShelfBookProps,
  ShelfItem,
  ShelfNoteProps,
} from "./types/shelfItem";

/** 本の見た目のうち、データからは決まらない部分 */
type BookLook = Required<
  Pick<ShelfBookProps, "cover" | "coverHeight" | "accent" | "size">
>;

/** 本の中身。データから決まる部分 */
type BookContent = Pick<
  ShelfBookProps,
  "title" | "meta" | "href" | "coverImageUrl" | "coverText"
>;

type ShelfLayout = {
  /** 本の見た目。冊数が多ければ先頭から繰り返す */
  looks: readonly BookLook[];
  /** メモと、その手前に来る本の位置（0 始まり） */
  notes: readonly { before: number; note: ShelfNoteProps }[];
};

/** pen `hdLAj` の Blog の Row (p1b4u) の並び */
const ARTICLE_SHELF_LAYOUT: ShelfLayout = {
  looks: [
    { cover: "muted", coverHeight: "lg", accent: "muted", size: "lg" },
    { cover: "info", coverHeight: "sm", accent: "primary", size: "md" },
    { cover: "muted", coverHeight: "lg", accent: "muted", size: "lg" },
    { cover: "muted", coverHeight: "md", accent: "success", size: "sm" },
    { cover: "light", coverHeight: "lg", accent: "danger", size: "sm" },
  ],
  notes: [
    {
      before: 1,
      note: { text: "わかりあえないを、\nわかる", label: "Attitude · 18" },
    },
  ],
};

/** pen `hdLAj` の Service の Row (VVE3R) の並び */
const SERVICE_SHELF_LAYOUT: ShelfLayout = {
  looks: [
    { cover: "light", coverHeight: "lg", accent: "info", size: "lg" },
    { cover: "dark", coverHeight: "sm", accent: "danger", size: "sm" },
    { cover: "light", coverHeight: "lg", accent: "primary", size: "lg" },
    { cover: "muted", coverHeight: "md", accent: "warning", size: "sm" },
  ],
  notes: [
    {
      before: 0,
      note: {
        text: "伝えるよりも、\n気づいてもらう",
        label: "Attitude · 10",
        size: "lg",
      },
    },
    {
      before: 2,
      note: { text: "意訳してみる", label: "Attitude · 15", size: "sm" },
    },
  ],
};

/**
 * 表紙文字の大きさ。pen では文字数に応じて 22〜56px に割れているので、
 * 見た目の幅（全角 1・半角 0.6）で ShelfBook の 3 段に振り分ける。
 * pen の表紙文字 9 件のうち 8 件がこの閾値で同じ段になる（KISO だけ 1 段小さくなる）
 */
export const toCoverTextSize = (
  text: string,
): NonNullable<ShelfBookProps["coverTextSize"]> => {
  const width = [...text].reduce(
    (sum, char) => sum + ((char.codePointAt(0) ?? 0) <= 0x7f ? 0.6 : 1),
    0,
  );

  if (width <= 1.5) return "lg";
  if (width <= 3) return "md";
  return "sm";
};

/**
 * 本を pen の並びに沿って棚に並べる。
 *
 * メモは本の手前にだけ差し込む。本が足りず手前に来る本が無いメモは置かない。
 * 棚の末尾にメモだけが残っても、本の連続を切るという役割を果たさないため。
 * 冊数分の周期でメモを繰り返さないのは、データの出どころが無い固定の文言で、
 * 同じ言葉が 1 段に何度も並ぶと装飾として成り立たないため
 */
const arrangeShelf = (
  books: readonly BookContent[],
  layout: ShelfLayout,
): ShelfItem[] =>
  books.flatMap((book, index) => {
    const notes = layout.notes
      .filter(({ before }) => before === index)
      .map(({ note }): ShelfItem => ({ kind: "note", ...note }));
    const look = layout.looks[index % layout.looks.length];

    return [
      ...notes,
      {
        kind: "book",
        ...look,
        coverTextSize: toCoverTextSize(book.coverText ?? book.title),
        ...book,
      },
    ];
  });

/** articles を Home の Blog の本棚に並べる。入力の順（新しい順）を保つ */
export const toArticleShelf = (
  articles: readonly (Article & MicroCMSListContent)[],
): ShelfItem[] =>
  arrangeShelf(
    articles.map((article) => ({
      title: article.title,
      // publishedAt は一度も公開していない記事には付かない。
      // 一覧に出るのは公開済みだけなので実際には来ないが、型の上では任意
      meta: `${toJstDate(article.publishedAt ?? article.createdAt)} · Blog`,
      href: `/article/${article.id}`,
      // articles は表紙画像を持たない。タイトルは長く表紙に収まらないため、
      // 先頭のタグ名（「開発」「備忘録」など短い分類）を表紙文字にする
      coverText: article.tags[0]?.name ?? article.title,
    })),
    ARTICLE_SHELF_LAYOUT,
  );

/** experiences を Home の Service の本棚に並べる。入力の順を保つ */
export const toServiceShelf = (
  experiences: readonly (Experiences & MicroCMSListContent)[],
): ShelfItem[] =>
  arrangeShelf(
    experiences.map((experience) => ({
      title: experience.title,
      // pen は「2024 | Service」だが、Service は棚の見出しと重なるため、
      // Service 一覧のカードと同じく種別 (kind) を出す
      meta: `${toJstYear(experience.startDate)} | ${experience.kind.join(" / ")}`,
      // /service/[id] は hasDetailPage が偽の実績を 404 にするので、真のときだけリンクする
      href: experience.hasDetailPage ? `/service/${experience.id}` : undefined,
      coverImageUrl: experience.heroImage?.[0]?.url,
      coverText: experience.title,
    })),
    SERVICE_SHELF_LAYOUT,
  );
