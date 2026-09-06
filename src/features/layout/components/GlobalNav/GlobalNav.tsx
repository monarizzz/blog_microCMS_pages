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
      <Link href="/search" aria-label="検索" className="text-secondary">
        <Search size={20} />
      </Link>
    </div>
  );
};

export default GlobalNav;
