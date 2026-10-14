import type { ArticleBlock } from "./articleBlock";

/** 記事詳細ページ 1 枚ぶんの表示データ */
export type ArticleDetail = {
  title: string;
  /** タグ名。`#` は表示側で付ける */
  tags: string[];
  /** `<time dateTime>` に入れる ISO 8601 の日時 */
  publishedAt: string;
  /** 表示用の公開日。JST の `YYYY.MM.DD` */
  publishedDate: string;
  blocks: ArticleBlock[];
};
