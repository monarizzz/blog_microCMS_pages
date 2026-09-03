import MetaText from "../MetaText/MetaText";

type Props = {
  title: string;
  kicker?: string;
  meta?: string;
  sub?: string;
  count?: string;
  compact?: boolean;
};

const PageHeader = ({ title, kicker, meta, sub, count, compact }: Props) => {
  return (
    <div className={`flex w-full flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {kicker && (
        <span className="text-secondary text-sm font-medium tracking-widest">
          {kicker}
        </span>
      )}
      {meta && <MetaText>{meta}</MetaText>}
      <h1
        className={
          compact
            ? "text-primary text-3xl font-bold tracking-tight"
            : "text-primary text-4xl font-bold tracking-tighter"
        }
      >
        {title}
      </h1>
      {sub && (
        <p className="text-on-surface-variant text-md leading-relaxed">{sub}</p>
      )}
      {count && <MetaText>{count}</MetaText>}
    </div>
  );
};

export default PageHeader;
