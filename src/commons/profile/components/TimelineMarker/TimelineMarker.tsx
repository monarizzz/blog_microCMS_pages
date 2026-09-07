type Size = "sm" | "lg";

type Props = {
  year: string;
  title?: string;
  size?: Size;
  hollow?: boolean;
};

const SIZE_CLASS_NAME: Record<
  Size,
  { content: string; year: string; title: string }
> = {
  sm: { content: "gap-0.5", year: "text-[12px]", title: "text-[8px]" },
  lg: { content: "gap-1", year: "text-lg", title: "text-[12px]" },
};

const TimelineMarker = ({
  year,
  title,
  size = "sm",
  hollow = false,
}: Props) => {
  const style = SIZE_CLASS_NAME[size];

  return (
    <div className="flex w-full items-center gap-3.5">
      <div className={`flex w-full flex-col items-end ${style.content}`}>
        <span
          className={`text-right font-mono font-bold tracking-tight text-primary ${style.year}`}
        >
          {year}
        </span>
        {title && (
          <span
            className={`text-right font-medium text-secondary ${style.title}`}
          >
            {title}
          </span>
        )}
      </div>
      {/*
        ドットは translate で半径分だけ右にずらし、中心をこのコンポーネントの右端に置く。
        （transform なのでレイアウト幅には影響しない）
        置く側は縦軸の中心と右端を揃えるだけでよい。ProfilePageMain では w-43.75 = 175px。
      */}
      <div className="flex shrink-0 items-center">
        <div className="h-0.5 w-7 bg-outline" />
        <div
          className={`size-2.75 shrink-0 translate-x-1/2 rounded-full ${
            hollow ? "border border-primary bg-on-primary" : "bg-primary"
          }`}
        />
      </div>
    </div>
  );
};

export default TimelineMarker;
