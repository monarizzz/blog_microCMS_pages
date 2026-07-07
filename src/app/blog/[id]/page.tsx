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

const BlogPage = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getBlogListDetail({ contentId: id });
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
