import Link from "next/link";
import SearchIconButton from "@/commons/button/components/SearchIconButton/SearchIconButton";
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
      <SearchIconButton link="/search" />
    </div>
  );
};

export default GlobalNav;
