import TagMain from "@/commons/tag/TagButton/TagMain/TagMain";
import { GetStaticProps, NextPage } from "next";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import * as cheerio from "cheerio";

type Props = {
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps = async () => {
  const categoryData = await getCategoriesList({ queries: { limit: 10 } });
  const categoryIds = categoryData.contents.map((category) => {
    return category.id;
  });

  const blogListByCategory = await Promise.all(
    categoryIds.map((categoryId) =>
      getBlogList({
        queries: { limit: 10, filters: `categories[contains]${categoryId}` },
      })
    )
  );

  const blogWithPlainTextList = blogListByCategory.map((article) => ({
    ...article,
    contents: article.contents.map((blog) => {
      const $ = cheerio.load(blog.body);
      $("br").replaceWith("\n");
      $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append("\n");
      const plainText = $.text().trim().slice(0, 150);

      return {
        ...blog,
        plainTextBody: plainText,
      };
    }),
  }));

  const blogCategoryList = categoryData.contents.map((category, index) => {
    return {
      id: category.id,
      name: category.name,
      blogWithPlainTextList: blogWithPlainTextList[index].contents,
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
