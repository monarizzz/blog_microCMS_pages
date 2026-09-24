/**
 * 本棚の「棚板」。1px の板と、その下に落ちる 6px の影で構成する。
 * 意味を持たない装飾なので、支援技術からは隠す。
 */
const ShelfPlank = () => {
  return (
    <div aria-hidden="true" className="flex w-full flex-col">
      <div className="h-px w-full bg-outline" />
      <div className="h-1.5 w-full bg-surface-container-low" />
    </div>
  );
};

export default ShelfPlank;
