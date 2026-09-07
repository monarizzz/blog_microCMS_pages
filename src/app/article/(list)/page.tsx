import ArticlePage from "@/features/article/components/articlePage/articlePage";

type Props = {
  searchParams: Promise<{ page?: string; sort?: string }>;
};

const ArticleListPage = async ({ searchParams }: Props) => {
  const { page, sort } = await searchParams;
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <ArticlePage
      currentPage={currentPage}
      sort={sort === "old" ? "old" : "new"}
    />
  );
};

export default ArticleListPage;
