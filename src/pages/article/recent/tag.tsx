import TagMain from "@/features/blog/tag/components/TagMain/TagMain";
import { getBlogCategoryList } from "@/features/blog/tag/services/getBlogCategoryList";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import { GetStaticProps, NextPage } from "next";

type Props = {
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getBlogCategoryList();

  return {
    props: {
      category: categoryData.contents,
      blogCategoryList: blogCategoryListData,
    },
    revalidate: 86400,
  };
};

const ArticleRecentTagPage: NextPage<Props> = ({
  category,
  blogCategoryList,
}) => {
  return <TagMain category={category} blogCategoryList={blogCategoryList} />;
};

export default ArticleRecentTagPage;
