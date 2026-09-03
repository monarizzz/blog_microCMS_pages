import GlobalNav from "../GlobalNav/GlobalNav";

type Props = {
  pageList: string[];
};

const Footer = ({ pageList }: Props) => {
  return (
    <div className="h-full bg-surface px-8 py-24">
      <div className="flex flex-col gap-4">
        <GlobalNav pageList={pageList} />
        <span className="-spacing-[0.5px] text-[24px]">MoneLogue</span>
        <span className="text-sm">© 2024 MoneLogue</span>
      </div>
    </div>
  );
};

export default Footer;
