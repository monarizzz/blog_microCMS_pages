import Link from "next/link";
import { pageList } from "../../constants/pageList";
import GlobalNav from "../GlobalNav/GlobalNav";

const Header = () => {
  return (
    <div className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <Link href="/" className="text-lg">
          Monelog
        </Link>
        <GlobalNav pageList={pageList} />
      </div>
    </div>
  );
};

export default Header;
