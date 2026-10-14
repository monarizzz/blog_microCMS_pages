import type { MicroCMSListContent } from "microcms-js-sdk";

import { richTextToPlainText } from "@/infra/microCMS/richTextToPlainText";
import type { Article } from "@/infra/microCMS/schema/article";

/** 検索結果 1 件分。ContentsRow に渡す分だけを持つ */
export type SearchResultArticle = {
  id: string;
  title: string;
  summary: string;
  /** ISO 8601 の日時文字列 */
  publishedAt: string;
  tags: string[];
};

/** 抜粋の最大文字数 (コードポイント数)。ContentsRow の 2 行程度に収まるようこちらで決めた値 */
export const SEARCH_SUMMARY_MAX_LENGTH = 100;

/**
 * 記事本文 (リッチエディタの HTML) から検索結果の抜粋を作る。
 * 段落の区切りも 1 つの空白に詰め、長ければ末尾を `…` にする。
 *
 * `slice` で切らないのは、UTF-16 の単位で数えると絵文字などの
 * サロゲートペアを途中で割ってしまうため
 */
export const toSearchSummary = (html: string) => {
  const text = richTextToPlainText(html).replace(/\s+/g, " ").trim();
  const chars = Array.from(text);

  return chars.length > SEARCH_SUMMARY_MAX_LENGTH
    ? `${chars.slice(0, SEARCH_SUMMARY_MAX_LENGTH).join("")}…`
    : text;
};

type SearchSourceArticle = Pick<Article, "title" | "content"> &
  Pick<MicroCMSListContent, "id" | "createdAt" | "publishedAt"> & {
    tags: { name: string }[];
  };

/** articles の 1 件を検索結果の行にする */
export const toSearchResultArticle = (
  article: SearchSourceArticle,
): SearchResultArticle => ({
  id: article.id,
  title: article.title,
  summary: toSearchSummary(article.content),
  // publishedAt は一度も公開していない記事には付かない。公開済みしか
  // 返ってこないので実際には来ないが、型の上では任意 (/article と同じ扱い)
  publishedAt: article.publishedAt ?? article.createdAt,
  tags: article.tags.map((tag) => tag.name),
});
