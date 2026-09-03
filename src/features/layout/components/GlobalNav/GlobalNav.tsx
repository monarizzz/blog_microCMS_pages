import { Search } from "lucide-react";

type Props = {
  pageList: string[];
};

const GlobalNav = ({ pageList }: Props) => {
  return (
    <div className="flex items-center gap-md">
      {pageList.map((page) => (
        <span key={page} className="font-sans text-base text-secondary">
          {page}
        </span>
      ))}
      <Search size={20} />
    </div>
  );
};

export default GlobalNav;
