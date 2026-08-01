import ArticleRow from "@/commons/article/components/ArticleRow/ArticleRow";
import SearchInput from "../SearchInput/SearchInput";
import { AlertCircle } from "lucide-react";

const num = 2;

const SearchPageMain = ({}) => {
  return (
    <div className="flex flex-col gap-6">
      <p>記事を検索</p>
      <SearchInput />
      <div className="flex items-center gap-2">
        <AlertCircle size={14} />
        <p>2文字以上で検索されます。</p>
      </div>
      <p className="text-secondary text-sm tracking-[0.5px]">
        検索結果 {num}件
      </p>
      <ArticleRow />
      <ArticleRow />
    </div>
  );
};
export default SearchPageMain;
