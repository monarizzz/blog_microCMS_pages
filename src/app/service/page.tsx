import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ServicePageMain from "@/features/service/components/ServicePageMain/ServicePageMain";

export const metadata = buildPageMetadata({
  title: "サービス",
  description: "これまでに作ったサービス・プロダクトの一覧です。",
  path: "/service",
});

const Service = () => {
  return (
    <LayoutMain>
      <ServicePageMain />
    </LayoutMain>
  );
};

export default Service;
