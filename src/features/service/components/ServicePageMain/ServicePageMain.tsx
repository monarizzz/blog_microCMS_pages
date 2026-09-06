import Divider from "@/commons/other/components/Divider/Divider";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import ServiceCardRow, {
  type ServiceCardRowItem,
} from "@/commons/service/components/ServiceCardRow/ServiceCardRow";

//TODO:仮置き
const services: ServiceCardRowItem[] = [
  {
    id: "blog",
    title: "技術ブログ",
    techStack: "Next.js / TypeScript / microCMS",
    url: "https://example.com",
    githubUrl: "https://github.com/example/blog",
  },
  {
    id: "weather-app",
    title: "天気予報アプリ",
    techStack: "Next.js / TypeScript / OpenWeather API",
    developmentType: "Team development",
    url: "https://example.com",
  },
  {
    id: "ec-site",
    title: "ECサイト",
    techStack: "Next.js / TypeScript / Stripe",
    developmentType: "Team development",
    githubUrl: "https://github.com/example/ec-site",
  },
  {
    id: "portfolio",
    title: "ポートフォリオ",
    techStack: "Astro / TypeScript",
    url: "https://example.com",
  },
];

const ROW_SIZE = 2;

const serviceRows = Array.from(
  { length: Math.ceil(services.length / ROW_SIZE) },
  (_, index) => services.slice(index * ROW_SIZE, (index + 1) * ROW_SIZE),
);

const ServicePageMain = () => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-9.5 pt-37.5 pr-10 pb-24 pl-11.75">
      <PageHeader
        title="Service"
        sub="これまでに開発したプロダクトと制作物のまとめ。"
        count={`${services.length} プロジェクト`}
        wide
      />
      <section className="flex flex-col gap-6">
        <div className="h-3.25 w-full border-b border-outline-variant" />
        <div className="flex flex-col gap-8">
          {serviceRows.map((row, index) => (
            <div key={row[0].id} className="flex flex-col gap-8">
              {index > 0 && (
                <div className="flex w-full items-center gap-16.25">
                  <Divider className="flex-1" />
                  <Divider className="flex-1" />
                </div>
              )}
              <ServiceCardRow services={row} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicePageMain;
