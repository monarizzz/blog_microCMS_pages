import { client } from "../../../libs/client";
import { Blog } from "@/infra/microCMS/schema/blog";
import { NextPage } from "next";
import ArticlePageMain from "@/features/blog/article/ArticlePageMain/ArticliePageMain";
import { CategoryArray } from "@/infra/microCMS/schema/categoryArray";

type Props = {
  blog: Blog;
  category: CategoryArray;
};

export const getServerSideProps = async (context) => {
  const articlePageId = context.params.articlePageId;
  const data = await client.get({ endpoint: "blog", contentId: articlePageId });
  const categoryData = await client.get({ endpoint: "categories" });
  return {
    props: {
      blog: data,
      category: categoryData.contents,
    },
  };
};

const ArticlePage: NextPage<Props> = ({ blog, category }) => {
  return <ArticlePageMain blog={blog} category={category} />;
};

export default ArticlePage;
