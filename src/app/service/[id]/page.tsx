import { notFound } from "next/navigation";

import { siteUrl } from "@/commons/constants/site";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ServiceDetailMain, {
  type ServiceDetail,
} from "@/features/service/components/ServiceDetailMain/ServiceDetailMain";

//TODO:仮置き。microCMS の experiences から引くのは別フェーズ
const services: Record<string, ServiceDetail> = {
  monelogue: {
    title: "MoneLogue",
    meta: "個人開発 · 2024 · フルスタック",
    description:
      "収支を記録し、資産の推移をグラフで可視化する家計簿アプリ。日々の入力から月次・年次の資産推移までを一元管理できます。",
    features: [
      "収支の記録とカテゴリ別の分類",
      "月次・年次レポートの自動生成",
      "資産推移のグラフ可視化",
      "データのCSVエクスポート",
    ],
    overview:
      "日々の収支入力から月次・年次の資産推移までを一元管理できる家計簿アプリです。microCMSをヘッドレスCMSとして採用し、カテゴリ管理を柔軟に行えるように設計しました。Rechartsによるグラフで資産の推移を直感的に把握できます。",
    techStack: [
      "Next.js",
      "TypeScript",
      "microCMS",
      "Tailwind CSS",
      "Recharts",
    ],
    periodLabel: "2024.01 - 2024.04",
    role: "設計 / 開発 / デザイン",
    url: "https://example.com",
    githubUrl: "https://github.com/example/monelogue",
  },
};

type Props = {
  params: Promise<{ id: string }>;
};

const ServiceDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const service = services[id];

  if (!service) {
    notFound();
  }

  return (
    <LayoutMain>
      <ServiceDetailMain
        service={service}
        shareUrl={`${siteUrl}/service/${id}`}
      />
    </LayoutMain>
  );
};

export default ServiceDetailPage;
