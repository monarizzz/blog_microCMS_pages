import { AllBlogData } from "../types/allBlogData";

const pageNavList = ({
  allBlogData,
  blogId,
}: {
  allBlogData: AllBlogData; // ここに配列型
  blogId?: string; // ここに数値型
}) => {
  const sortedBlogs = allBlogData.contents.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const currentIndex = sortedBlogs.findIndex(
    (sortedBlog) => sortedBlog.id === blogId
  );

  // 前の記事の比較
  const prevBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  // 次の記事の比較
  const nextBlog =
    currentIndex < sortedBlogs.length - 1
      ? sortedBlogs[currentIndex + 1]
      : null;

  return {
    prevBlog: prevBlog
      ? {
          id: prevBlog.id,
          title: prevBlog.title,
        }
      : null,
    nextBlog: nextBlog
      ? {
          id: nextBlog.id,
          title: nextBlog.title,
        }
      : null,
  };
};

export default pageNavList;
