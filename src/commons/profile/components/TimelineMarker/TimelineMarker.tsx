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
    <div className="flex w-full gap-3.5">
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
      <div className="flex shrink-0 items-center pt-3">
        <div className="h-0.5 w-7 bg-outline" />
        <div
          className={
            hollow
              ? "size-2.75 shrink-0 rounded-full border border-primary bg-on-primary"
              : "size-2.75 shrink-0 rounded-full bg-primary"
          }
        />
      </div>
    </div>
  );
};

export default TimelineMarker;
