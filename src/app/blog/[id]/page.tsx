import { getBlogList } from "@/infra/microCMS/repositories/contents/getBlogList";
import pageNavList from "@/features/blog/utils/pageNavList";
import BlogDetail from "@/features/blog/components/BlogDetail/BlogDetail";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { authOptions } from "@/infra/auth/authOptions";
import { getServerSession } from "next-auth";

export async function generateStaticParams() {
  const data = await getBlogList({ queries: { fields: ["id"] } });
  return data.contents.map((blog) => ({
    id: blog.id,
  }));
}

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getBlogList({ queries: { ids: `${id}` } });
  const allBlogData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });
  const blogNavigation = pageNavList({ allBlogData, id });

  const session = await getServerSession(authOptions);

  return (
    <LayoutMain session={session}>
      <BlogDetail
        blog={data.contents[0]}
        category={data.contents[0].categories}
        blogNavigation={blogNavigation}
      />
    </LayoutMain>
  );
};

export default BlogPage;
