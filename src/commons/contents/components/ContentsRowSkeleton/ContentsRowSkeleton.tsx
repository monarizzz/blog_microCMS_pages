type Props = {
  compact?: boolean;
};

const ContentsRowSkeleton = ({ compact }: Props) => {
  const tags = (
    <div className="flex gap-2">
      <div className="h-5.5 w-16 rounded-full bg-surface-container-low" />
      <div className="h-5.5 w-20 rounded-full bg-surface-container-low" />
    </div>
  );

  return (
    <div
      aria-hidden
      className="flex w-full gap-8 border-b border-outline-variant py-6 motion-safe:animate-pulse"
    >
      <div className="flex w-24 flex-col gap-2 pt-1">
        <div className="h-2.75 w-16 rounded-[3px] bg-surface-container" />
      </div>
      {compact ? (
        <div className="flex w-full items-center justify-between">
          <div className="h-5 w-96 rounded-[4px] bg-surface-container" />
          {tags}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3.5">
          <div className="h-5 w-full rounded-[4px] bg-surface-container" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-3.25 w-full rounded-[3px] bg-surface-container-low" />
            <div className="h-3.25 w-full rounded-[3px] bg-surface-container-low" />
            <div className="h-3.25 w-65 rounded-[3px] bg-surface-container-low" />
          </div>
          <div className="pt-1">{tags}</div>
        </div>
      )}
    </div>
  );
};

export default ContentsRowSkeleton;
