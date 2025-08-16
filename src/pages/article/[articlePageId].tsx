import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ArticlePageMain from "@/features/blog/article/components/ArticlePageMain/ArticlePageMain";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { getBlogList } from "@/infra/microCMS/repositories/blog";

type Props = {
  blog: Blog;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const articlePageId = context.params?.articlePageId;
  const data = await getBlogList({ queries: { ids: `${articlePageId}` } });
  return {
    props: {
      blog: data.contents[0],
      category: data.contents[0].categories,
    },
    revalidate: 86400,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getBlogList({ queries: { fields: ["id"] } });

  const paths = data.contents.map((idsObject) => ({
    params: {
      articlePageId: idsObject.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

const ArticlePage: NextPage<Props> = ({ blog, category }) => {
  return <ArticlePageMain blog={blog} category={category} />;
};

export default ArticlePage;
