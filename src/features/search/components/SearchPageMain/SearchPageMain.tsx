import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import SearchInput from "../SearchInput/SearchInput";
import { AlertCircle, SearchX } from "lucide-react";
import TagBtn from "@/commons/button/components/TagBtn/TagBtn";
import { MIN_QUERY_LENGTH } from "../../constants/searchQuery";
import type { SearchResultArticle } from "../../searchResults";
import Link from "next/link";

type Props = {
  /** URL の `?q=` から渡される現在の検索クエリ */
  query?: string;
  /** 検索結果。結果ありの表示はこの配列の長さだけで決まる */
  articles?: SearchResultArticle[];
  /**
   * クエリに一致した総件数。取得件数に上限があるため articles.length より
   * 大きくなりうる。省略時は articles.length とみなす
   */
  totalCount?: number;
  /** 結果が無いときに提示するタグ名。空なら提示の文言ごと出さない */
  suggestedTags?: string[];
};

const SearchPageMain = ({
  query,
  articles = [],
  totalCount = articles.length,
  suggestedTags = [],
}: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6 pt-37.5 pr-10 pb-24 pl-11.75">
      <h1 className="text-sm tracking-[0.5px]">記事を検索</h1>
      <SearchInput query={query} />
      <div className="flex items-center gap-2">
        <AlertCircle size={14} />
        <p>{MIN_QUERY_LENGTH}文字以上で検索されます。</p>
      </div>
      <p className="text-sm tracking-[0.5px] text-secondary">
        検索結果 {totalCount}件
        {totalCount > articles.length &&
          `（新しい順に ${articles.length}件を表示）`}
      </p>
      {articles.length > 0 ? (
        <div className="flex w-full flex-col">
          {articles.map((article) => (
            <ContentsRow
              key={article.id}
              title={article.title}
              summary={article.summary}
              publishedAt={article.publishedAt}
              tags={article.tags}
              href={`/article/${article.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-16">
          <SearchX size={48} className="text-outline" />
          <p className="text-lg font-bold text-primary">
            一致する記事が見つかりませんでした
          </p>
          {suggestedTags.length > 0 ? (
            <>
              <p className="text-base text-secondary">
                キーワードを変えてお試しいただくか、以下のタグから記事を探してみてください。
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedTags.map((tag) => (
                  <TagBtn
                    key={tag}
                    text={tag}
                    link={`/tags?tag=${encodeURIComponent(tag)}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-base text-secondary">
              キーワードを変えてお試しください。
            </p>
          )}
          <Link href="/search" className="text-base text-on-surface-variant">
            検索をクリア
          </Link>
        </div>
      )}
    </div>
  );
};
export default SearchPageMain;
