const ArticleCardSkeleton = () => {
  return (
    <div
      aria-hidden
      className="flex w-full flex-col gap-7 border border-outline-variant bg-surface motion-safe:animate-pulse"
    >
      <div className="h-45 w-full bg-surface-container-low" />
      <div className="flex w-full flex-col items-center gap-3.5 px-4 pb-5">
        <div className="h-[11px] w-30 rounded-[3px] bg-surface-container-low" />
        <div className="h-5 w-50 rounded-[4px] bg-surface-container" />
        <div className="h-3 w-[230px] rounded-[3px] bg-surface-container-low" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
