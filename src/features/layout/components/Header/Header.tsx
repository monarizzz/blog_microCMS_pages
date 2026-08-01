import GlobalNav from "../GlobalNav/GlobalNav";

type Props = {
  pageList: string[];
};

const Header = ({ pageList }: Props) => {
  return (
    <div className="bg-surface w-full px-8 py-3">
      <div className="flex justify-between">
        <span className="text-xl">MoneLogue</span>
        <GlobalNav pageList={pageList} />
      </div>
    </div>
  );
};

export default Header;
