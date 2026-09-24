import ContentsRowSkeleton from "@/commons/contents/components/ContentsRowSkeleton/ContentsRowSkeleton";

type Props = {
  /** 解決後に描画される行数。ページごとに変わるので呼び出し側から渡す */
  rowCount: number;
};

const ArticlePageSkeleton = ({ rowCount }: Props) => {
  return (
    <div
      role="status"
      className="mx-auto flex w-full max-w-275 flex-col gap-10 pt-28.25 pr-10 pb-24 pl-11.75"
    >
      <span className="sr-only">記事一覧を読み込んでいます</span>
      <div className="flex w-full flex-col">
        {Array.from({ length: rowCount }, (_, i) => (
          <ContentsRowSkeleton key={i} compact />
        ))}
      </div>
    </div>
  );
};

export default ArticlePageSkeleton;
