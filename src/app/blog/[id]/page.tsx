import { getBlogList } from "@/infra/microCMS/repositories/contents/getBlogList";
import pageNavList from "@/features/blog/utils/pageNavList";
import BlogDetail from "@/features/blog/components/BlogDetail/BlogDetail";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";

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
  console.log(params);
  const { id } = await params;
  const data = await getBlogList({ queries: { ids: `${id}` } });
  const allBlogData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });
  const blogNavigation = pageNavList(allBlogData.contents, id);

  return (
    <LayoutMain>
      <BlogDetail
        blog={data.contents[0]}
        category={data.contents[0].categories}
        blogNavigation={blogNavigation}
      />
    </LayoutMain>
  );
};

export default BlogPage;
