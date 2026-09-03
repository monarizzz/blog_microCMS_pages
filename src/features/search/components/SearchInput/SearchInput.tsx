import { Search, XIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-4 rounded-input px-4 py-3 outline outline-primary">
      <Search size={20} className="text-secondary" />

      <div className="w-full">
        {/* <input /> */}
        <p className="text-base">App Router</p>
      </div>
      <button type="button" aria-label="検索をクリア">
        <XIcon size={14} className="text-secondary" />
      </button>
    </div>
  );
};
export default SearchInput;
