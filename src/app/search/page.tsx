import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import SearchPageMain from "@/features/search/components/SearchPageMain/SearchPageMain";

export const metadata = buildPageMetadata({
  title: "検索",
  description: "キーワードから記事を検索できます。",
  path: "/search",
});

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  // `?q=foo&q=bar` のように同名で複数指定されると配列で届く。
  // 後から指定されたものを採用する (末尾が最後の入力に当たる)
  const query = (Array.isArray(q) ? q.at(-1) : q)?.trim();

  return (
    <LayoutMain>
      <SearchPageMain query={query} />
    </LayoutMain>
  );
};

export default SearchPage;
