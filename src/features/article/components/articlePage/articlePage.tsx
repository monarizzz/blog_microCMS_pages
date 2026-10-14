import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import BackLink from "@/commons/other/components/BackLink/BackLink";
import FilterBtn from "@/commons/button/components/FilterBtn/FilterBtn";
import MetaText from "@/commons/other/components/MetaText/MetaText";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import PageNavNum from "@/commons/navigation/components/PageNumNav/PageNumNav";
import { resolveArticleListRange } from "@/features/article/articleListPagination";

export type ArticleListItem = {
  id: string;
  title: string;
  /** ISO 8601 の日時文字列 */
  publishedAt: string;
  tags: string[];
};

type Sort = "new" | "old";

type Props = {
  /** 現在のページに並べる記事。並び順・絞り込みは取得側で済ませておく */
  articles: ArticleListItem[];
  /** 絞り込み後の総件数。ページ数と範囲表示に使う */
  totalCount: number;
  currentPage: number;
  sort: Sort;
  /** 絞り込み中のタグ名。無ければ全記事の一覧として出す */
  tag?: string;
};

/** 並び替えは 1 ページ目に戻すため page を付けず、絞り込みのタグだけ引き継ぐ */
const sortHref = (sort: Sort, tag?: string) =>
  `?${new URLSearchParams(tag ? { tag, sort } : { sort })}`;

const ArticlePage = ({
  articles,
  totalCount,
  currentPage,
  sort,
  tag,
}: Props) => {
  const { totalPages, start, end } = resolveArticleListRange(
    currentPage,
    totalCount,
  );

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-10 pt-28.25 pr-10 pb-24 pl-11.75">
      {/*
        pen (nwTBC) はタグで絞り込んだ状態しか描いていない。
        全記事の一覧は Tags から来たわけではないので戻りリンクを出さず、
        見出しはグローバルナビの英語表記に合わせて "Articles" にした
      */}
      {tag && <BackLink text="Tags へ" link="/tags" />}
      <PageHeader
        compact
        title={tag ? `#${tag}` : "Articles"}
        count={`${totalCount} 記事`}
      />
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <div className="flex items-center gap-2">
          <FilterBtn
            text="新着順"
            link={sortHref("new", tag)}
            active={sort === "new"}
          />
          <FilterBtn
            text="古い順"
            link={sortHref("old", tag)}
            active={sort === "old"}
          />
        </div>
        <MetaText>
          {start}–{end} / {totalCount}
        </MetaText>
      </div>
      {articles.length > 0 ? (
        <div className="flex w-full flex-col">
          {articles.map((article) => (
            <ContentsRow
              key={article.id}
              compact
              title={article.title}
              publishedAt={article.publishedAt}
              tags={article.tags}
              href={`/article/${article.id}`}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-on-surface-variant">記事はまだありません。</p>
      )}
      <div className="flex items-center justify-center gap-2 pt-6">
        <PageNavNum
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/article"
          query={{ tag, sort }}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
