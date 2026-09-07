import MetaText from "../MetaText/MetaText";

type Props = {
  title: string;
  kicker?: string;
  meta?: string;
  sub?: string;
  count?: string;
  compact?: boolean;
  wide?: boolean;
  /** ServiceDetailPage の Hero (sHYtM) 相当。gap だけ 14px に詰める */
  hero?: boolean;
  /**
   * Home の Intro (`UmjU2`) 相当。gap を 18px にし、Kicker を等幅・字間 2px、
   * Title の字間を snug (-0.3px) に緩める。
   * padding は持たない（pen 側のインスタンスは padding を上書きしているが、
   * 他ページと同じく余白はページ側の責務に寄せた）
   */
  intro?: boolean;
};

const PageHeader = ({
  title,
  kicker,
  meta,
  sub,
  count,
  compact,
  wide,
  hero,
  intro,
}: Props) => {
  const gapClassName = compact
    ? "gap-3"
    : hero
      ? "gap-3.5"
      : intro
        ? "gap-4.5"
        : "gap-4";

  return (
    <div className={`flex w-full flex-col ${gapClassName}`}>
      {kicker && (
        <span
          className={
            intro
              ? "font-mono text-sm font-medium tracking-[2px] text-secondary"
              : "text-sm font-medium tracking-[1.5px] text-secondary"
          }
        >
          {kicker}
        </span>
      )}
      {meta && <MetaText>{meta}</MetaText>}
      <h1
        className={
          compact
            ? "text-3xl font-bold tracking-tight text-primary"
            : intro
              ? "text-4xl leading-tight font-bold tracking-snug text-primary"
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
