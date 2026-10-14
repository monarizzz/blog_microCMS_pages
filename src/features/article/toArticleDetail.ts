import type { MicroCMSListContent } from "microcms-js-sdk";

import { toJstDate } from "@/commons/date/jstDate";
import type { Article } from "@/infra/microCMS/schema/article";

import { toArticleBlocks } from "./toArticleBlocks";
import type { ArticleDetail } from "./types/articleDetail";

/** articles の 1 件を記事詳細ページの表示データにする */
export const toArticleDetail = (
  article: Article & MicroCMSListContent,
): ArticleDetail => {
  // publishedAt は一度も公開していない下書きには付かない。下書きは draftKey なしでは
  // 取得できないので実際には来ないが、型の上では任意なので一覧と同じく createdAt に落とす
  const publishedAt = article.publishedAt ?? article.createdAt;
  // 複数参照は同じタグを重ねて選べるため、名前が 2 回並ばないよう id で除く
  const seenTagIds = new Set<string>();

  return {
    title: article.title,
    tags: (article.tags ?? [])
      .filter((tag) => {
        if (seenTagIds.has(tag.id)) return false;
        seenTagIds.add(tag.id);
        return true;
      })
      .map((tag) => tag.name),
    publishedAt,
    publishedDate: toJstDate(publishedAt),
    blocks: toArticleBlocks(article.content ?? ""),
  };
};
