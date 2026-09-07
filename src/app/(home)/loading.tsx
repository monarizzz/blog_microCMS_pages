import ArticleCardSkeleton from "@/commons/contents/components/ArticleCardSkeleton/ArticleCardSkeleton";

const SKELETON_CARDS = 2;

const HomeLoading = () => {
  return (
    <div
      role="status"
      className="mx-auto flex w-full max-w-275 flex-col gap-10 pt-28.25 pr-10 pb-24 pl-11.75"
    >
      <span className="sr-only">トップページを読み込んでいます</span>
      <div className="flex w-full gap-6">
        {Array.from({ length: SKELETON_CARDS }, (_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default HomeLoading;
