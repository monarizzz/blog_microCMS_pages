import Link from "next/link";
import GlobalNav from "../GlobalNav/GlobalNav";

const Header = () => {
  return (
    <header className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <Link href="/" className="text-lg">
          Monelog
        </Link>
        <GlobalNav label="メインナビゲーション" />
      </div>
    </header>
  );
};

export default Header;
