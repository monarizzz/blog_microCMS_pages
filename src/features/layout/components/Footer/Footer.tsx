import GlobalNav from "../GlobalNav/GlobalNav";

/** サイト公開年。著作権表記の開始年として使う */
const SITE_LAUNCH_YEAR = 2024;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear > SITE_LAUNCH_YEAR
      ? `${SITE_LAUNCH_YEAR}-${currentYear}`
      : `${SITE_LAUNCH_YEAR}`;

  return (
    <div className="h-full bg-surface px-8 py-24">
      <div className="flex flex-col gap-4">
        <GlobalNav />
        <span className="text-[24px] tracking-[-0.5px]">Monelog</span>
        <span className="text-sm">© {copyrightYears} Monelog</span>
      </div>
    </div>
  );
};

export default Footer;
