/** 前後記事ナビが 1 件分に必要とする記事の情報 */
export type AdjacentPost = {
  id: string;
  title: string;
};

export type PostNavigation = {
  prev?: AdjacentPost;
  next?: AdjacentPost;
};
