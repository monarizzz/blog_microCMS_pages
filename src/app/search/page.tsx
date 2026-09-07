import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import SearchPageMain from "@/features/search/components/SearchPageMain/SearchPageMain";

export const metadata = buildPageMetadata({
  title: "検索",
  description: "キーワードから記事を検索できます。",
  path: "/search",
});

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;

  return (
    <LayoutMain>
      <SearchPageMain query={q?.trim()} />
    </LayoutMain>
  );
};

export default SearchPage;
