import ArticleRow from "@/commons/article/components/ArticleRow/ArticleRow";
import SearchInput from "../SearchInput/SearchInput";
import { AlertCircle, SearchX } from "lucide-react";
import TagBtn from "@/commons/layout/components/TagBtn/TagBtn";
import { MIN_QUERY_LENGTH } from "../../constants/searchQuery";

//TODO:仮置き
type Props = {
  article?: boolean;
  num?: number;
};

const SearchPageMain = ({ article, num }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-sm tracking-[0.5px]">記事を検索</h1>
      <SearchInput />
      <div className="flex items-center gap-2">
        <AlertCircle size={14} />
        <p>{MIN_QUERY_LENGTH}文字以上で検索されます。</p>
      </div>
      <p className="text-secondary text-sm tracking-[0.5px]">
        検索結果 {num}件
      </p>
      {article ? (
        <>
          <ArticleRow />
          <ArticleRow />
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <SearchX size={48} className="text-outline" />
          <p className="text-primary text-lg font-bold">
            一致する記事が見つかりませんでした
          </p>
          <p className="text-secondary text-base">
            キーワードを変えてお試しいただくか、以下のタグから記事を探してみてください。
          </p>
          <div>
            <TagBtn text="タグ" link="" />
          </div>
          <button
            type="button"
            aria-label="検索をクリア"
            className="text-on-surface-variant text-base"
          >
            検索をクリア
          </button>
        </div>
      )}
    </div>
  );
};
export default SearchPageMain;
