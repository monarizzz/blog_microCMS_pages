import { MIN_QUERY_LENGTH } from "./constants/searchQuery";

/** 検索結果 1 件分。ContentsRow に渡す分だけを持つ */
export type SearchResultArticle = {
  id: string;
  title: string;
  summary: string;
  /** ISO 8601 の日付 */
  publishedAt: string;
  tags: string[];
};

//TODO:仮置き。microCMS の記事検索に差し替えるのは #282 の範囲
const sampleArticles: SearchResultArticle[] = [
  {
    id: "nextjs-app-router",
    title: "Next.js 14 App Router 移行の勘所",
    summary:
      "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。",
    publishedAt: "2024-03-18",
    tags: ["Next.js", "設計"],
  },
  {
    id: "server-components-boundary",
    title: "Server Components の境界をどこに引くか",
    summary:
      "インタラクティブな要素が必要な箇所だけを Client Component に切り出すと、バンドルサイズと開発体験の両方を保てます。境界の引き方を整理します。",
    publishedAt: "2024-02-06",
    tags: ["Next.js", "設計"],
  },
  {
    id: "typescript-using",
    title: "TypeScript 5.2 の using 宣言によるリソース管理",
    summary:
      "Symbol.dispose に対応したオブジェクトをスコープの終わりで自動的に片付けられます。後始末の書き忘れを型の側から防げるようになりました。",
    publishedAt: "2024-01-22",
    tags: ["TypeScript"],
  },
];

/**
 * クエリに一致する記事を返す。
 * 最小文字数に満たない場合は検索を実行せず、空配列を返す
 */
export const resolveSearchResults = (query?: string): SearchResultArticle[] => {
  const keyword = query?.trim() ?? "";

  if (keyword.length < MIN_QUERY_LENGTH) return [];

  const lowered = keyword.toLowerCase();

  return sampleArticles.filter(({ title, summary, tags }) =>
    [title, summary, ...tags].some((text) =>
      text.toLowerCase().includes(lowered),
    ),
  );
};
