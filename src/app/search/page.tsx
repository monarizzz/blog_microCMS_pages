import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import SearchPageMain from "@/features/search/components/SearchPageMain/SearchPageMain";
import { MIN_QUERY_LENGTH } from "@/features/search/constants/searchQuery";
import {
  type SearchResultArticle,
  toSearchResultArticle,
} from "@/features/search/searchResults";
import { pickSuggestedTags } from "@/features/search/suggestedTags";
import { getArticle } from "@/infra/microCMS/api/getArticle";

export const metadata = buildPageMetadata({
  title: "検索",
  description: "キーワードから記事を検索できます。",
  path: "/search",
});

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

/**
 * 1 回の検索で取得する件数の上限。ui.pen の検索画面にページ送りが無いため、
 * ページングせず先頭からこの件数だけ並べる。抜粋のために本文ごと取得するので、
 * 1 リクエストが重くなりすぎない範囲としてこちらで決めた値
 */
const SEARCH_RESULT_LIMIT = 20;

/** 提示するタグを選ぶ元にする記事の数。microCMS の 1 リクエストあたりの上限 */
const SUGGESTED_TAG_SOURCE_LIMIT = 100;

/** 同じ publishedAt の記事の順序を固定するため、/article と同じく createdAt を第 2 キーにする */
const NEWEST_FIRST = "-publishedAt,-createdAt";

const searchArticles = async (keyword: string) => {
  const { contents, totalCount } = await getArticle({
    // q は filters と違い独立したクエリパラメータで、SDK が URL エンコードして渡す。
    // 入力に `[or]` などを混ぜても式として解釈されないため、そのまま渡してよい
    q: keyword,
    limit: SEARCH_RESULT_LIMIT,
    orders: NEWEST_FIRST,
    fields: "id,title,content,publishedAt,createdAt,tags.name",
  });

  return { articles: contents.map(toSearchResultArticle), totalCount };
};

/**
 * 結果が無いときに提示するタグ。新しい記事から順に、付いている記事の多いタグを選ぶ。
 * 提示は補助なので、取得に失敗してもページは落とさずタグ無しで出す
 */
const getSuggestedTags = async () => {
  try {
    const { contents } = await getArticle({
      limit: SUGGESTED_TAG_SOURCE_LIMIT,
      orders: NEWEST_FIRST,
      fields: "tags.name",
    });

    return pickSuggestedTags(
      contents.map((article) => article.tags.map((tag) => tag.name)),
    );
  } catch {
    return [];
  }
};

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  // `?q=foo&q=bar` のように同名で複数指定されると配列で届く。
  // 後から指定されたものを採用する (末尾が最後の入力に当たる)
  const query = (Array.isArray(q) ? q.at(-1) : q)?.trim();

  // 最小文字数に満たないクエリでは検索を実行しない (入力欄も URL に反映しない長さ)
  const { articles, totalCount } =
    query && query.length >= MIN_QUERY_LENGTH
      ? await searchArticles(query)
      : { articles: [] as SearchResultArticle[], totalCount: 0 };
  const suggestedTags = articles.length === 0 ? await getSuggestedTags() : [];

  return (
    <LayoutMain>
      <SearchPageMain
        query={query}
        articles={articles}
        totalCount={totalCount}
        suggestedTags={suggestedTags}
      />
    </LayoutMain>
  );
};

export default SearchPage;
