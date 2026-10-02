import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import SearchInput from "../SearchInput/SearchInput";
import { AlertCircle, SearchX } from "lucide-react";
import TagBtn from "@/commons/button/components/TagBtn/TagBtn";
import { MIN_QUERY_LENGTH } from "../../constants/searchQuery";
import type { SearchResultArticle } from "../../searchResults";
import Link from "next/link";

//TODO:仮置き。結果が無いときに提示するタグ。
// #282 のデータ接続時はタグ一覧から引く
const suggestedTags = ["Next.js", "設計", "TypeScript", "テスト"];

type Props = {
  /** URL の `?q=` から渡される現在の検索クエリ */
  query?: string;
  /** 検索結果。件数と結果ありの表示はこの配列の長さだけで決まる */
  articles?: SearchResultArticle[];
};

const SearchPageMain = ({ query, articles = [] }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6 pt-37.5 pr-10 pb-24 pl-11.75">
      <h1 className="text-sm tracking-[0.5px]">記事を検索</h1>
      <SearchInput query={query} />
      <div className="flex items-center gap-2">
        <AlertCircle size={14} />
        <p>{MIN_QUERY_LENGTH}文字以上で検索されます。</p>
      </div>
      <p className="text-sm tracking-[0.5px] text-secondary">
        検索結果 {articles.length}件
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
          <Link href="/search" className="text-base text-on-surface-variant">
            検索をクリア
          </Link>
        </div>
      )}
    </div>
  );
};
export default SearchPageMain;
