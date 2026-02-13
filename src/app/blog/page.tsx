import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { getBlogListByCategory } from "@/features/blog/utils/getBlogListByCategory";
import BlogMain from "@/features/blog/components/BlogMain/BlogMain";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/infra/auth/authOptions";

const BlogPage = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getBlogListByCategory(categoryData);
  const session = await getServerSession(authOptions);

  return (
    <LayoutMain session={session}>
      <BlogMain
        category={categoryData.contents}
        categoryWithBlogList={blogCategoryListData}
      />
    </LayoutMain>
  );
};

export default BlogPage;
