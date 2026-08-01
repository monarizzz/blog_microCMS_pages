import { Search, XIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="outline-primary flex items-center gap-4 rounded-[12px] px-4 py-3 outline">
      <Search size={20} className="text-secondary" />

      <div className="w-full">
        {/* <input /> */}
        <p className="text-base">App Router</p>
      </div>
      <XIcon size={14} className="text-secondary" />
    </div>
  );
};
export default SearchInput;
