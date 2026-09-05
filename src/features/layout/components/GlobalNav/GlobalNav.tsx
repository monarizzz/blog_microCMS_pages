import { Search } from "lucide-react";
import Link from "next/link";
import { pageList } from "../../constants/pageList";

type Props = {
  pageList: typeof pageList;
};

const GlobalNav = ({ pageList }: Props) => {
  return (
    <div className="flex items-center gap-md">
      {pageList.map((page) => (
        <Link
          key={page.path}
          href={page.path}
          className="font-sans text-base text-secondary"
        >
          {page.label}
        </Link>
      ))}
      <Search size={20} />
    </div>
  );
};

export default GlobalNav;
