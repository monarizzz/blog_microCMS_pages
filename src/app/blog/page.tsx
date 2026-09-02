import { Suspense } from "react";
import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { getBlogListByCategory } from "@/features/blog/utils/getBlogListByCategory";
import BlogMain from "@/features/blog/components/BlogMain/BlogMain";

// microCMSの更新を反映させるため、60秒ごとに再生成する
export const revalidate = 60;

const BlogPage = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getBlogListByCategory(categoryData);

  return (
    <LayoutMain>
      <Suspense>
        <BlogMain
          category={categoryData.contents}
          categoryWithBlogList={blogCategoryListData}
        />
      </Suspense>
    </LayoutMain>
  );
};

export default BlogPage;
