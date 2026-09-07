import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import BackLink from "@/commons/other/components/BackLink/BackLink";
import FilterBtn from "@/commons/button/components/FilterBtn/FilterBtn";
import MetaText from "@/commons/other/components/MetaText/MetaText";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import PageNavNum from "@/commons/navigation/components/PageNumNav/PageNumNav";
import {
  resolveArticleListPage,
  totalCount,
  totalPages,
} from "@/features/article/articleListPagination";

//TODO:仮置き
const tag = "Next.js";

//TODO:仮置き。microCMS の articles から引くのは #282 の範囲。
// 行数 (rowCount) はページネーションから決まるので、この配列を順に使い回す
const sampleArticles = [
  {
    id: "nextjs-app-router",
    title: "Next.js 14 App Router 移行の勘所",
    publishedAt: "2024-03-18",
    tags: ["Next.js", "設計"],
  },
  {
    id: "server-components-boundary",
    title: "Server Components の境界をどこに引くか",
    publishedAt: "2024-02-06",
    tags: ["Next.js", "設計"],
  },
  {
    id: "typescript-using",
    title: "TypeScript 5.2 の using 宣言によるリソース管理",
    publishedAt: "2024-01-22",
    tags: ["TypeScript"],
  },
  {
    id: "tailwind-v4",
    title: "Tailwind CSS v4 への期待と課題",
    publishedAt: "2023-12-11",
    tags: ["設計"],
  },
  {
    id: "testing-library-pitfalls",
    title: "Testing Library で壊れにくいテストを書く",
    publishedAt: "2023-11-24",
    tags: ["テスト", "TypeScript"],
  },
];

type Props = {
  currentPage?: number;
  sort?: "new" | "old";
};

const ArticlePage = ({ currentPage = 1, sort = "new" }: Props) => {
  const { page, start, end, rowCount } = resolveArticleListPage(currentPage);

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-10 pt-28.25 pr-10 pb-24 pl-11.75">
      <BackLink text="Tags へ" link="/tags" />
      <PageHeader compact title={`#${tag}`} count={`${totalCount} 記事`} />
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <div className="flex items-center gap-2">
          <FilterBtn text="新着順" link="?sort=new" active={sort === "new"} />
          <FilterBtn text="古い順" link="?sort=old" active={sort === "old"} />
        </div>
        <MetaText>
          {start}–{end} / {totalCount}
        </MetaText>
      </div>
      <div className="flex w-full flex-col">
        {Array.from({ length: rowCount }, (_, i) => {
          const article = sampleArticles[i % sampleArticles.length];

          return (
            <ContentsRow
              key={i}
              compact
              title={article.title}
              publishedAt={article.publishedAt}
              tags={article.tags}
              href={`/article/${article.id}`}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 pt-6">
        <PageNavNum
          currentPage={page}
          totalPages={totalPages}
          basePath="/article"
          query={{ sort }}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
