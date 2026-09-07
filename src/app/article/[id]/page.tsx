import type { Metadata } from "next";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import { getArticleDetail } from "@/infra/microCMS/api/getArticleDetail";

type Props = {
  params: Promise<{ id: string }>;
};

/** リッチテキストの HTML から og:description 用の平文を作る */
const toDescription = (html: string) => {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 120 ? `${text.slice(0, 120)}…` : text;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  // 存在しない ID では microCMS が 404 を投げる。ここで落とすと
  // ページ本体より先にメタデータ生成で 500 になるため、既定値に退避する
  const article = await getArticleDetail(id).catch(() => null);

  if (!article) {
    return buildPageMetadata({
      title: "記事",
      description: "記事ページです。",
      path: `/article/${id}`,
      type: "article",
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: toDescription(article.content),
    path: `/article/${id}`,
    type: "article",
  });
};

const ArticleDetailPage = () => {
  return (
    <LayoutMain>
      <>[id]</>
    </LayoutMain>
  );
};

export default ArticleDetailPage;
