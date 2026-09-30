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
