import { Suspense } from "react";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import { resolveArticleListPage } from "@/features/article/articleListPagination";
import ArticlePage from "@/features/article/components/articlePage/articlePage";
import ArticlePageSkeleton from "@/features/article/components/articlePageSkeleton/articlePageSkeleton";

export const metadata = buildPageMetadata({
  title: "記事一覧",
  description: "投稿した記事の一覧です。新着順・古い順に並び替えて探せます。",
  path: "/article",
});

type Props = {
  searchParams: Promise<{ page?: string; sort?: string }>;
};

const ArticleListPage = async ({ searchParams }: Props) => {
  const { page, sort } = await searchParams;
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { rowCount } = resolveArticleListPage(currentPage);

  return (
    <Suspense
      key={`${currentPage}-${sort}`}
      fallback={<ArticlePageSkeleton rowCount={rowCount} />}
    >
      <ArticlePage
        currentPage={currentPage}
        sort={sort === "old" ? "old" : "new"}
      />
    </Suspense>
  );
};

export default ArticleListPage;
