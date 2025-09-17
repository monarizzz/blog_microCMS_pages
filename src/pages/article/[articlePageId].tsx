import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ArticlePageMain from "@/features/blog/article/components/ArticlePageMain/ArticlePageMain";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import CommonLayout from "@/commons/layout/Layout/CommonLayout";
import { ArticleNavigation } from "@/infra/microCMS/schema/Blog/articleNavigation";

type Props = {
  blog: Blog;
  category: CategoryList;
  articleNavigation: ArticleNavigation;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const articlePageId = context.params?.articlePageId;
  const data = await getBlogList({ queries: { ids: `${articlePageId}` } });

  const allArticleData = await getBlogList({
    queries: { fields: ["id", "title", "publishedAt"] },
  });

  const sortedArticles = allArticleData.contents.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const currentIndex = sortedArticles.findIndex(
    (sortedBlog) => sortedBlog.id === articlePageId
  );

  // 前の記事の比較
  const prevArticle =
    currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
  // 次の記事の比較
  const nextArticle =
    currentIndex < sortedArticles.length - 1
      ? sortedArticles[currentIndex + 1]
      : null;

  return {
    props: {
      blog: data.contents[0],
      category: data.contents[0].categories,
      articleNavigation: {
        prevArticle: prevArticle
          ? { id: prevArticle.id, title: prevArticle.title }
          : null,
        nextArticle: nextArticle
          ? { id: nextArticle.id, title: nextArticle.title }
          : null,
      },
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
  return (
    <CommonLayout>
      <ArticlePageMain
        blog={blog}
        category={category}
        articleNavigation={articleNavigation}
      />
    </CommonLayout>
  );
};

export default ArticlePage;
