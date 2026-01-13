import { Blog } from "@/libs/schema/Blog/blog";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/libs/schema/Blog/articleNavigation";
import pageNation from "@/features/article/utils/pageNavList";
import ArticlePageMain from "@/features/article/components/ArticlePageMain/ArticlePageMain";
import { useSession } from "next-auth/react";
import Header from "@/commons/layout/components/Header/Header";

type Props = {
  blog: Blog;
  category: CategoryList;
  articleNavigation: ArticleNavigation;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const articlePageId = context.params?.articlePageId?.toString();
  const data = await getBlogList({ queries: { ids: `${articlePageId}` } });

  const allArticleData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });

  const articleNavigation = pageNation({ allArticleData, articlePageId });
  return {
    props: {
      blog: data.contents[0],
      category: data.contents[0].categories,
      articleNavigation,
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

const ArticlePage: NextPage<Props> = ({
  blog,
  category,
  articleNavigation,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <Header session={session} />
      <ArticlePageMain
        blog={blog}
        category={category}
        articleNavigation={articleNavigation}
      />
    </>
  );
};

export default ArticlePage;
