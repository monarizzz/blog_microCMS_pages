type Props = {
  children: React.ReactNode;
};

const Table = ({ children }: Props) => {
  return (
    <div className="w-full overflow-x-auto rounded-xs border border-outline-variant">
      <table
        className="w-full border-collapse text-base
          [&_th]:border-b [&_th]:border-outline-variant [&_th]:bg-surface-container-low [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-sans [&_th]:font-bold [&_th]:text-primary
          [&_td]:border-b [&_td]:border-outline-variant [&_td]:px-4 [&_td]:py-2 [&_td]:font-mono [&_td]:font-normal [&_td]:text-on-surface
          [&_tr:last-child_td]:border-b-0"
      >
        {children}
      </table>
    </div>
  );
};

export default Table;
