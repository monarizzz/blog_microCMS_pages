import { Blog } from "@/libs/schema/Blog/blog";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/features/blog/types/articleNavigation";
import pageNation from "@/features/blog/utils/pageNavList";
import { useSession } from "next-auth/react";
import Header from "@/commons/layout/components/Header/Header";
import BlogPageMain from "@/features/blog/components/BlogPageMain/BlogPageMain";

type Props = {
  blog: Blog;
  category: CategoryList;
  articleNavigation: ArticleNavigation;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const blogId = context.params?.blogId?.toString();
  const data = await getBlogList({ queries: { ids: `${blogId}` } });

  const allArticleData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });

  const articleNavigation = pageNation({ allArticleData, blogId });
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
      blogId: idsObject.id,
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
      <BlogPageMain
        blog={blog}
        category={category}
        articleNavigation={articleNavigation}
      />
    </>
  );
};

export default ArticlePage;
