import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ArticlePageMain from "@/features/blog/article/components/ArticlePageMain/ArticlePageMain";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  blog: Blog;
  category: CategoryList;
  prevPost: Pick<Blog, "id" | "title"> | null;
  nextPost: Pick<Blog, "id" | "title"> | null;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const articlePageId = context.params?.articlePageId as string;
  const data = await getBlogList({ queries: { ids: `${articlePageId}` } });

  const allPostsData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });

  const sortedPosts = allPostsData.contents.sort((a, b) =>
    new Date(b.publishedAt) > new Date(a.publishedAt) ? 1 : -1
  );

  const currentIndex = sortedPosts.findIndex(
    (post) => post.id === articlePageId
  );

  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return {
    props: {
      blog: data.contents[0],
      category: data.contents[0].categories,
      prevPost: prevPost ? { id: prevPost.id, title: prevPost.title } : null,
      nextPost: nextPost ? { id: nextPost.id, title: nextPost.title } : null,
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

const ArticlePage: NextPage<Props> = ({ blog, category, prevPost, nextPost }) => {
  return <ArticlePageMain blog={blog} category={category} prevPost={prevPost} nextPost={nextPost} />;
};

export default ArticlePage;
