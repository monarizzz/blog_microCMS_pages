import { ReactNode } from "react";

type Props = {
  /** 並べる ShelfBook / ShelfNote */
  children: ReactNode;
  /**
   * 横スクロール領域の名前。読み上げと、キーボードで
   * フォーカスが乗ったときの手がかりになる。例: "Blog の本棚"
   */
  label: string;
};

/**
 * 本棚 1 段の、本を並べる横スクロール領域（pen `hdLAj` の Row）。
 *
 * 中の ShelfBook / ShelfNote は高さがまちまちで、棚板に載っているように
 * 見せるため下端を揃える（items-end）。子は `shrink-0` 済みなので
 * 縮まずに溢れ、そのまま横スクロールになる。
 *
 * pen に単体のコンポーネントとしては存在しない（各ページの Row フレーム）。
 * Shelf を 2 段並べる Home で同じ組みが 2 回出るため、切り出した。
 */
const ShelfRow = ({ children, label }: Props) => {
  return (
    // スクロールできる領域はキーボードだけでも操作できる必要があるため
    // tabIndex を付けてフォーカス可能にする。ただの入れ物で見出しは
    // ShelfLabel 側に出ているので、role は group に留める
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className="flex w-full items-end gap-5.5 overflow-x-auto content-gutter-scroll"
    >
      {children}
    </div>
  );
};

export default ShelfRow;
