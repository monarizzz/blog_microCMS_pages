import GlobalNav from "../GlobalNav/GlobalNav";

const Footer = () => {
  return (
    <div className="h-full bg-surface px-8 py-24">
      <div className="flex flex-col gap-4">
        <GlobalNav />
        <span className="text-[24px] tracking-[-0.5px]">Monelog</span>
        <span className="text-sm">© 2024 Monelog</span>
      </div>
    </div>
  );
};

export default Footer;
