import Image from "next/image";
import Link from "next/link";

type Props = {
  /** 帯に出すタイトル。記事名 / サービス名 */
  title: string;
  /** 帯の上段。例: "2024.03.18 · Blog" "2024 | Service" */
  meta: string;
  href: string;
  /**
   * 表紙の画像 URL。next/image で最適化するため、`next.config.ts` の
   * images.remotePatterns に登録されたホスト (microCMS) か public 配下のみ渡せる。
   * 未指定なら coverText を大きく置く
   */
  coverImageUrl?: string;
  /**
   * 表紙に置く文字。画像が無い本の背表紙代わり。例: "小杉湯" "TS" "あ"
   * 画像・文字ともに未指定なら title を置くため、表紙が空になることはない
   */
  coverText?: string;
  cover?: Cover;
  coverTextSize?: CoverTextSize;
  coverHeight?: CoverHeight;
  accent?: Accent;
  size?: Size;
};

type Cover = "light" | "dark" | "muted" | "info";
type CoverTextSize = "sm" | "md" | "lg";
type CoverHeight = "sm" | "md" | "lg";
type Accent = "primary" | "info" | "danger" | "warning" | "success" | "muted";
type Size = "sm" | "md" | "lg";

/** 表紙の地色と、その上に載る文字色の組み合わせ */
const COVER_CLASS_NAME = {
  light: "bg-surface text-primary",
  dark: "bg-primary text-on-primary",
  muted: "bg-surface-container-low text-secondary",
  info: "bg-surface text-ac-info",
} as const satisfies Record<Cover, string>;

/**
 * pen の表紙文字は 22〜56px までインスタンスごとに割れている。
 * 文字数に応じた調整なので、短い順に 3 段へ畳んだ。
 */
const COVER_TEXT_SIZE_CLASS_NAME = {
  sm: "text-[26px]",
  md: "text-[40px]",
  lg: "text-[52px]",
} as const satisfies Record<CoverTextSize, string>;

/** pen の表紙高さ 232〜322 を 3 段に畳んだもの */
const COVER_HEIGHT_CLASS_NAME = {
  sm: "h-58",
  md: "h-68",
  lg: "h-76",
} as const satisfies Record<CoverHeight, string>;

/**
 * 帯の地色と文字色の組み合わせ。
 *
 * アクセント 4 色は ac-* (500) ではなく面色の ac-*-bg を地色に使う。
 * 500 に文字を載せるとコントラストが白文字で 3.7〜3.9、
 * on-surface に反転しても 4.3〜4.4 で、どちらも AA (4.5:1) に届かない。
 * ac-*-bg + on-surface なら 15:1 前後を確保できる。
 * ui.pen は 500 の濃い帯だが、既存トークンの中では両立しないため面色を採る。
 */
const ACCENT_CLASS_NAME = {
  primary: "bg-primary text-on-primary",
  info: "bg-ac-info-bg text-on-surface",
  danger: "bg-ac-danger-bg text-on-surface",
  warning: "bg-ac-warning-bg text-on-surface",
  success: "bg-ac-success-bg text-on-surface",
  muted: "bg-surface-container-low text-on-surface",
} as const satisfies Record<Accent, string>;

/** pen の本の幅 202〜248 を 3 段に畳んだもの */
const SIZE_CLASS_NAME = {
  sm: "w-52",
  md: "w-56",
  lg: "w-60",
} as const satisfies Record<Size, string>;

/**
 * 本棚に並べる 1 冊。表紙（画像 or 文字）と、下に巻いた帯で構成する。
 * 記事にもサービスにも使う。
 */
const ShelfBook = ({
  title,
  meta,
  href,
  coverImageUrl,
  coverText,
  cover = "light",
  coverTextSize = "md",
  coverHeight = "md",
  accent = "primary",
  size = "md",
}: Props) => {
  return (
    <Link
      href={href}
      className={`flex shrink-0 flex-col border border-outline-variant bg-surface ${SIZE_CLASS_NAME[size]}`}
    >
      <div
        className={`relative flex w-full flex-col items-center justify-center gap-2.5 overflow-hidden p-6 ${COVER_HEIGHT_CLASS_NAME[coverHeight]} ${COVER_CLASS_NAME[cover]}`}
      >
        {coverImageUrl ? (
          // タイトルは帯に出ているため、表紙は装飾扱いで alt は空。
          // sizes は本の最大幅 (lg = 240px) に合わせた固定値
          <Image
            src={coverImageUrl}
            alt=""
            fill
            sizes="240px"
            className="object-cover"
          />
        ) : (
          // 表紙文字も帯の title と同じ内容を装飾として見せるだけなので、
          // 読み上げからは除外する。画像表紙の alt="" と揃える
          <span
            aria-hidden="true"
            className={`text-center font-sans font-bold tracking-[1px] ${COVER_TEXT_SIZE_CLASS_NAME[coverTextSize]}`}
          >
            {coverText ?? title}
          </span>
        )}
      </div>
      <div
        className={`flex w-full flex-col gap-1.25 px-4 py-3.5 ${ACCENT_CLASS_NAME[accent]}`}
      >
        <span className="font-mono text-sm tracking-[0.5px]">{meta}</span>
        <span className="w-full text-[15px] leading-[1.35] font-bold tracking-[0.2px]">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default ShelfBook;
