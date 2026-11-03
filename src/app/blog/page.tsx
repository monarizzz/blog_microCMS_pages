import { Suspense } from "react";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { getBlogListByCategory } from "@/features/blog/utils/getBlogListByCategory";
import BlogMain from "@/features/blog/components/BlogMain/BlogMain";

export const metadata = buildPageMetadata({
  title: "ブログ",
  description: "カテゴリごとにブログ記事を一覧できます。",
  path: "/blog",
});

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
