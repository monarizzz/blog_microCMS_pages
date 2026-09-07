import Link from "next/link";
import GlobalNav from "../GlobalNav/GlobalNav";

const Header = () => {
  return (
    <div className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <Link href="/" className="text-lg">
          Monelog
        </Link>
        <GlobalNav />
      </div>
    </div>
  );
};

export default Header;
