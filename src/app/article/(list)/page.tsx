import ArticlePage from "@/features/article/components/articlePage/articlePage";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

type Props = {
  searchParams: Promise<{ page?: string; sort?: string }>;
};

const ArticleListPage = async ({ searchParams }: Props) => {
  const { page, sort } = await searchParams;
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <LayoutMain>
      <ArticlePage
        currentPage={currentPage}
        sort={sort === "old" ? "old" : "new"}
      />
    </LayoutMain>
  );
};

export default ArticleListPage;
