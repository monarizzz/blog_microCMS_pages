import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ScrollNav from "@/commons/navigation/components/ScrollNav/ScrollNav";
import ServicePageMain from "@/features/service/components/ServicePageMain/ServicePageMain";
import { getAllExperiences } from "@/infra/microCMS/api/getAllExperiences";

export const metadata = buildPageMetadata({
  title: "サービス",
  description: "これまでに作ったサービス・プロダクトの一覧です。",
  path: "/service",
});

const Service = async () => {
  const services = await getAllExperiences({ orders: "-startDate" });

  return (
    <>
      <LayoutMain>
        <ServicePageMain services={services} />
      </LayoutMain>
      <ScrollNav />
    </>
  );
};

export default Service;
