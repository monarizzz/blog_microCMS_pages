import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import TagMain from "@/commons/tag/TagButton/TagMain/TagMain";
import { GetStaticProps, NextPage } from "next";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";

type Props = {
  blog: Blog;
  category: CategoryList;
  blogCategoryList: BlogCategoryList;
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
  };
};

const ArticleRecentTagPage: NextPage<Props> = ({
  category,
  blogCategoryList,
}) => {
  return <TagMain category={category} blogCategoryList={blogCategoryList} />;
};
export default ArticleRecentTagPage;
