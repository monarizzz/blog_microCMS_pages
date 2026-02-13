import { Blog } from "@/libs/schema/contents/Blog/blog";

const pageNavList = (blogs: Blog[], id?: string) => {
  const currentIndex = blogs.findIndex((blog) => blog.id === id);

  // 前の記事の比較
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  // 次の記事の比較
  const nextBlog =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

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
