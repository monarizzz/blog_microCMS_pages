import GlobalNav from "../GlobalNav/GlobalNav";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <Logo href="/" />
        <GlobalNav label="メインナビゲーション" />
      </div>
    </header>
  );
};

export default Header;
