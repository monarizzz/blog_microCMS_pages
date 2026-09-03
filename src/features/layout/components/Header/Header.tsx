import GlobalNav from "../GlobalNav/GlobalNav";

type Props = {
  pageList: string[];
};

const Header = ({ pageList }: Props) => {
  return (
    <div className="w-full bg-surface px-8 py-3">
      <div className="flex justify-between">
        <span className="text-xl">Monelog</span>
        <GlobalNav pageList={pageList} />
      </div>
    </div>
  );
};

export default Header;
