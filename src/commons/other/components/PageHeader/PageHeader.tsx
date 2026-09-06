import MetaText from "../MetaText/MetaText";

type Props = {
  title: string;
  kicker?: string;
  meta?: string;
  sub?: string;
  count?: string;
  compact?: boolean;
  wide?: boolean;
};

const PageHeader = ({
  title,
  kicker,
  meta,
  sub,
  count,
  compact,
  wide,
}: Props) => {
  return (
    <div className={`flex w-full flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {kicker && (
        <span className="text-sm font-medium tracking-[1.5px] text-secondary">
          {kicker}
        </span>
      )}
      {meta && <MetaText>{meta}</MetaText>}
      <h1
        className={
          compact
            ? "text-3xl font-bold tracking-tight text-primary"
            : "text-4xl font-bold tracking-tighter text-primary"
        }
      >
        {title}
      </h1>
      {sub && (
        <p
          className={
            wide
              ? "w-140 max-w-full text-base/relaxed text-on-surface-variant"
              : "text-md/relaxed text-on-surface-variant"
          }
        >
          {sub}
        </p>
      )}
      {count && <MetaText>{count}</MetaText>}
    </div>
  );
};

export default PageHeader;
