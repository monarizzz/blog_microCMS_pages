import Divider from "@/commons/layout/components/Divider/Divider";
import PageHeader from "@/commons/layout/components/PageHeader/PageHeader";
import ScrollNav from "@/commons/layout/components/ScrollNav/ScrollNav";
import ServiceCardRow from "@/features/service/components/ServiceCardRow/ServiceCardRow";

//TODO:仮置き(microCMS 接続は別フェーズ)
const placeholderCard = {
  title: "プロジェクト名",
  role: "Solo development",
  stack: "Next.js / TypeScript / microCMS",
  url: "https://example.com",
  github: "https://github.com/example/example",
};

const rows = [
  {
    left: placeholderCard,
    right: { ...placeholderCard, title: "天気予報アプリ" },
  },
  {
    left: placeholderCard,
    right: { ...placeholderCard, title: "ECサイト" },
  },
];

const ServicePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-[38px] pt-[150px] pr-10 pb-24 pl-[47px]">
      <PageHeader
        wide
        title="Service"
        sub="これまでに開発したプロダクトと制作物のまとめ。"
        count="6 プロジェクト"
      />
      <div className="flex flex-col gap-6">
        <div className="h-[13px] border-b border-outline-variant" />
        <div className="flex flex-col gap-8">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-8">
              {i > 0 && (
                <div className="flex w-full items-center gap-[65px]">
                  <Divider />
                  <Divider />
                </div>
              )}
              <ServiceCardRow left={row.left} right={row.right} />
            </div>
          ))}
        </div>
      </div>
      <ScrollNav />
    </div>
  );
};

export default ServicePage;
