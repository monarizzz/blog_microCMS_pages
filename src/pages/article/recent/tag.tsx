import TagMain from "@/commons/tag/TagButton/TagMain/TagMain";
import { GetStaticProps, NextPage } from "next";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps = async () => {
  const categoryData = await getCategoriesList({ queries: { limit: 10 } });
  const categoryIds = categoryData.contents.map((category) => {
    return category.id;
  });

  const promises = categoryIds.map((categoryId) => {
    return getBlogList({
      queries: { limit: 10, filters: `categories[contains]${categoryId}` },
    });
  });
  const blogListByCategory = await Promise.all(promises);
  const blogCategoryList = categoryData.contents.map((category, index) => {
    return {
      id: category.id,
      name: category.name,
      blogList: blogListByCategory[index],
    };
  });
  return {
    props: {
      category: categoryData.contents,
      blogCategoryList,
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
