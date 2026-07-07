import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { getBlogListByCategory } from "@/features/blog/utils/getBlogListByCategory";
import BlogMain from "@/features/blog/components/BlogMain/BlogMain";

const BlogPage = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getBlogListByCategory(categoryData);

  return (
    <LayoutMain>
      <BlogMain
        category={categoryData.contents}
        categoryWithBlogList={blogCategoryListData}
      />
    </LayoutMain>
  );
};

export default BlogPage;
