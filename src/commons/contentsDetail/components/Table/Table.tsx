type Props = {
  children: React.ReactNode;
  /** 横スクロール領域のアクセシブル名。記事内に複数の表がある場合に区別できる名前を渡す */
  label?: string;
};

const Table = ({ children, label = "表" }: Props) => {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="w-full overflow-x-auto rounded-xs border border-outline-variant"
    >
      <table className="w-full border-collapse text-base [&_tbody:last-of-type:not(:has(~tfoot))>tr:last-child_:is(td,th)]:border-b-0 [&_td]:border-b [&_td]:border-outline-variant [&_td]:px-4 [&_td]:py-2 [&_td]:font-mono [&_td]:font-normal [&_td]:text-on-surface [&_tfoot_tr:last-child_:is(td,th)]:border-b-0 [&_th]:border-b [&_th]:border-outline-variant [&_th]:bg-surface-container-low [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-sans [&_th]:font-bold [&_th]:text-primary">
        {children}
      </table>
    </div>
  );
};

export default Table;
