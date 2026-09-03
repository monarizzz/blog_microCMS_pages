import ArticleRow from "@/commons/article/components/ArticleRow/ArticleRow";
import BackLink from "@/commons/layout/components/BackLink/BackLink";
import FilterBtn from "@/commons/layout/components/FilterBtn/FilterBtn";
import MetaText from "@/commons/layout/components/MetaText/MetaText";
import PageHeader from "@/commons/layout/components/PageHeader/PageHeader";
import PageNavNum from "@/commons/pageNav/components/pageNavNum/pageNavNum";

//TODO:仮置き
const tag = "Next.js";
const totalCount = 38;
const perPage = 15;
const totalPages = 10;

type Props = {
  currentPage?: number;
  sort?: "new" | "old";
};

const ArticlePage = ({ currentPage = 1, sort = "new" }: Props) => {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 pt-[113px] pr-10 pb-24 pl-[47px]">
      <BackLink text="Tags へ" link="/tags" />
      <PageHeader compact title={`#${tag}`} count={`${totalCount} 記事`} />
      <div className="border-outline-variant flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <FilterBtn
            text="新着順"
            link="?sort=new"
            active={sort === "new"}
          />
          <FilterBtn
            text="古い順"
            link="?sort=old"
            active={sort === "old"}
          />
        </div>
        <MetaText>
          {start}–{end} / {totalCount}
        </MetaText>
      </div>
      <div className="flex w-full flex-col">
        {Array.from({ length: perPage }, (_, i) => (
          <ArticleRow key={i} compact />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pt-6">
        <PageNavNum currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ArticlePage;
