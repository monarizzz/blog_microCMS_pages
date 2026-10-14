import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import {
  ARTICLES_PER_PAGE,
  articleListOffset,
} from "@/features/article/articleListPagination";
import ArticlePage from "@/features/article/components/articlePage/articlePage";
import ArticlePageSkeleton from "@/features/article/components/articlePageSkeleton/articlePageSkeleton";
import { getArticle } from "@/infra/microCMS/api/getArticle";
import { getTags } from "@/infra/microCMS/api/getTags";

type SearchParams = { page?: string; sort?: string; tag?: string };

type Props = {
  searchParams: Promise<SearchParams>;
};

type Sort = "new" | "old";

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const { tag } = await searchParams;

  return buildPageMetadata({
    title: tag ? `#${tag} の記事` : "記事一覧",
    description: tag
      ? `「${tag}」のタグが付いた記事の一覧です。`
      : "投稿した記事の一覧です。新着順・古い順に並び替えて探せます。",
    path: "/article",
  });
};

/**
 * Tags ページは `?tag=<タグ名>` でリンクしてくる。microCMS の絞り込みは
 * 参照先の id で行うため、名前から id を引く。見つからなければ undefined
 */
const findTagId = async (name: string) => {
  const { contents } = await getTags({
    filters: `name[equals]${name}`,
    fields: "id",
    limit: 1,
  });
  return contents[0]?.id;
};

type ArticleListProps = {
  currentPage: number;
  sort: Sort;
  tag?: string;
  tagId?: string;
};

const ArticleList = async ({
  currentPage,
  sort,
  tag,
  tagId,
}: ArticleListProps) => {
  const { contents, totalCount } = await getArticle({
    limit: ARTICLES_PER_PAGE,
    offset: articleListOffset(currentPage),
    orders: sort === "old" ? "publishedAt" : "-publishedAt",
    fields: "id,title,publishedAt,createdAt,tags.name",
    filters: tagId ? `tags[contains]${tagId}` : undefined,
  });

  // 範囲外のページ番号。Suspense の内側なので、ストリーミングが始まっていると
  // ステータスは 404 にならない（not-found の UI だけ出る）。総件数が分かるのは
  // 取得後で、1 ページ目の表示を待たせないためにこの位置で判定している
  if (currentPage > 1 && contents.length === 0) {
    notFound();
  }

  return (
    <ArticlePage
      articles={contents.map((article) => ({
        id: article.id,
        title: article.title,
        // publishedAt は下書きのまま一度も公開していない記事には付かない。
        // 一覧に出るのは公開済みだけなので実際には来ないが、型の上では任意
        publishedAt: article.publishedAt ?? article.createdAt,
        tags: article.tags.map((articleTag) => articleTag.name),
      }))}
      totalCount={totalCount}
      currentPage={currentPage}
      sort={sort}
      tag={tag}
    />
  );
};

const ArticleListPage = async ({ searchParams }: Props) => {
  const { page, sort, tag } = await searchParams;
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const resolvedSort: Sort = sort === "old" ? "old" : "new";

  // 存在しないタグは 404。Suspense の外で判定し、ステータスも 404 にする
  const tagId = tag ? await findTagId(tag) : undefined;
  if (tag && !tagId) {
    notFound();
  }

  return (
    <Suspense
      key={`${currentPage}-${resolvedSort}-${tag ?? ""}`}
      fallback={<ArticlePageSkeleton rowCount={ARTICLES_PER_PAGE} />}
    >
      <ArticleList
        currentPage={currentPage}
        sort={resolvedSort}
        tag={tag}
        tagId={tagId}
      />
    </Suspense>
  );
};

export default ArticleListPage;
