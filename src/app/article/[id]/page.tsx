import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

type Props = {
  params: Promise<{ id: string }>;
};

// 仮ページ。記事詳細のコンポーネントが出来たら差し替える
const ArticleDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <LayoutMain>
      <p>記事詳細ページ（準備中）: {id}</p>
    </LayoutMain>
  );
};

export default ArticleDetailPage;
