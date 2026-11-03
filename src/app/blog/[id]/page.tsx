import { cache } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import getPlainText from "@/features/blog/utils/getPlainText";
import { getBlogList } from "@/infra/microCMS/repositories/contents/getBlogList";
import pageNavList from "@/features/blog/utils/pageNavList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import BlogDetail from "@/features/blog/components/BlogDetail/BlogDetail";
import getBlogListDetail from "@/infra/microCMS/repositories/contents/getBlogListDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const blogList = await getBlogList({ queries: { fields: ["id"] } });
  return blogList.contents.map((blog) => ({
    id: blog.id,
  }));
}

/** generateMetadata とページ本体で同じ id を引くので、cache で 1 リクエストにまとめる */
const getBlog = cache((id: string) => getBlogListDetail({ contentId: id }));

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const blog = await getBlog(id);

  return buildPageMetadata({
    title: blog.title,
    description: getPlainText(blog.body),
    path: `/blog/${id}`,
    type: "article",
  });
};

const BlogPage = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getBlog(id);
  const allBlogData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });

  const blogNavigation = pageNavList(allBlogData.contents, id);

  return (
    <LayoutMain>
      <BlogDetail
        blog={data}
        category={data.categories}
        blogNavigation={blogNavigation}
      />
    </LayoutMain>
  );
};

export default BlogPage;
