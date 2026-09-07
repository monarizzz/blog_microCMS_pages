import GlobalNav from "../GlobalNav/GlobalNav";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <div className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <Logo href="/" />
        <GlobalNav />
      </div>
    </div>
  );
};

export default Header;
