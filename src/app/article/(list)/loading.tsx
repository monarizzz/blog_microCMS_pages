import ContentsRowSkeleton from "@/commons/contents/components/ContentsRowSkeleton/ContentsRowSkeleton";

// ArticlePage の perPage と同じ件数ぶん領域を確保する
const SKELETON_ROWS = 15;

const ArticleListLoading = () => {
  return (
    <div
      role="status"
      aria-busy
      className="mx-auto flex w-full max-w-275 flex-col gap-10 pt-28.25 pr-10 pb-24 pl-11.75"
    >
      <span className="sr-only">記事一覧を読み込んでいます</span>
      <div className="flex w-full flex-col">
        {Array.from({ length: SKELETON_ROWS }, (_, i) => (
          <ContentsRowSkeleton key={i} compact />
        ))}
      </div>
    </div>
  );
};

export default ArticleListLoading;
