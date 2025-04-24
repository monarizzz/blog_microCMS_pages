import { client } from "../../libs/microCMS/utils/client";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { GetServerSideProps, NextPage } from "next";
import ArticlePageMain from "@/features/blog/article/components/ArticlePageMain/ArticlePageMain";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: Blog;
  category: CategoryList;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const articlePageId = context.params?.articlePageId;
  const data = await client.get({
    endpoint: "blog",
    contentId: `${articlePageId}`,
  });
  return {
    props: {
      blog: data,
      category: data.categories,
    },
  };
};

const ArticlePage: NextPage<Props> = ({ blog, category }) => {
  return <ArticlePageMain blog={blog} category={category} />;
};

export default ArticlePage;
