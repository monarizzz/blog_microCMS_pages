type Props = {
  /** 本文。改行は "\n" で渡す（whitespace-pre-line で反映する） */
  text: string;
  /** 下部のラベル。例: "Attitude · 10" */
  label: string;
  size?: Size;
};

type Size = "sm" | "md" | "lg";

/**
 * pen ではインスタンスごとに 176x248 / 180x272 / 186x300 と寸法が割れている。
 * 動的な数値は Tailwind がクラスを生成できないため、3 段の離散バリアントに畳んだ。
 */
const SIZE_CLASS_NAME = {
  sm: "h-62 w-44",
  md: "h-68 w-45",
  lg: "h-75 w-46.5",
} as const satisfies Record<Size, string>;

/**
 * 本棚に本と並べて差し込む、言葉だけのメモ。
 * 背表紙（ShelfBook）の連続を切る役割を持つ。
 */
const ShelfNote = ({ text, label, size = "md" }: Props) => {
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-between gap-6 overflow-hidden border border-outline-variant bg-surface px-5 pt-7 pb-5 ${SIZE_CLASS_NAME[size]}`}
    >
      <p className="w-full text-center text-[15px] leading-[1.9] font-medium tracking-[1px] whitespace-pre-line text-primary">
        {text}
      </p>
      <span className="text-center font-mono text-2xs tracking-[1px] text-on-surface-variant">
        {label}
      </span>
    </div>
  );
};

export default ShelfNote;
