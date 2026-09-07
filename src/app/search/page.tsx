import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import SearchPageMain from "@/features/search/components/SearchPageMain/SearchPageMain";

export const metadata = buildPageMetadata({
  title: "検索",
  description: "キーワードから記事を検索できます。",
  path: "/search",
});

const SearchPage = () => {
  return (
    <LayoutMain>
      <SearchPageMain />
    </LayoutMain>
  );
};

export default SearchPage;
