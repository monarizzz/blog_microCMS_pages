/** 記事一覧の 1 ページあたりの件数。microCMS の limit にもこの値を渡す */
export const ARTICLES_PER_PAGE = 15;

/** ページ番号から microCMS に渡す offset を出す */
export const articleListOffset = (page: number) =>
  (page - 1) * ARTICLES_PER_PAGE;

/**
 * 総件数から総ページ数と、そのページに並ぶ記事の通し番号の範囲 (`16–30 / 38`) を出す。
 * 記事が 0 件でも総ページ数は 1 にする（ページ番号ナビを 1 ページとして出すため）
 */
export const resolveArticleListRange = (page: number, totalCount: number) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / ARTICLES_PER_PAGE));
  const end = Math.min(page * ARTICLES_PER_PAGE, totalCount);
  const start = end === 0 ? 0 : articleListOffset(page) + 1;

  return { totalPages, start, end };
};
