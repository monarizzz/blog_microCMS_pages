import { Search } from "lucide-react";

type Props = {
  pageList: string[];
};

const GlobalNav = ({ pageList }: Props) => {
  return (
    <div className="gap-md flex items-center">
      {pageList.map((page) => (
        <span key={page} className="text-secondary font-sans text-base">
          {page}
        </span>
      ))}
      <Search size={20} />
    </div>
  );
};

export default GlobalNav;
