import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * 本棚 1 段の見出し（"Blog" "Service" など）。
 * Home の各 Shelf セクションの先頭に置く。
 */
const ShelfLabel = ({ children }: Props) => {
  return (
    <div className="flex w-full items-center gap-3 px-16 pb-5">
      <h2 className="font-sans text-[30px] font-medium tracking-[2px] text-primary">
        {children}
      </h2>
    </div>
  );
};

export default ShelfLabel;
