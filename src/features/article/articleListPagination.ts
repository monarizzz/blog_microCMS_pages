//TODO:仮置き
export const totalCount = 38;
export const perPage = 15;

export const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

/** ページ番号を有効範囲にクランプし、その回に描画される行数と範囲を返す */
export const resolveArticleListPage = (currentPage: number) => {
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalCount);

  return { page, start, end, rowCount: Math.max(0, end - start + 1) };
};

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
