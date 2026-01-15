import { AllBlogData } from "../types/allArticleData";

const pageNavList = ({
  allArticleData,
  blogId,
}: {
  allArticleData: AllBlogData; // ここに配列型
  blogId?: string; // ここに数値型
}) => {
  const sortedArticles = allArticleData.contents.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const currentIndex = sortedArticles.findIndex(
    (sortedBlog) => sortedBlog.id === blogId
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
    prevArticle: prevArticle
      ? {
          id: prevArticle.id,
          title: prevArticle.title,
        }
      : null,
    nextArticle: nextArticle
      ? {
          id: nextArticle.id,
          title: nextArticle.title,
        }
      : null,
  };
};

export default pageNavList;
