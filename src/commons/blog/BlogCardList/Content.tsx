import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { CategoryList } from "@/libs/schema/Category/category";
import { NextPage } from "next";

type Props = {
  blogWithPlainTextList: BlogWithPlainTextList;
  category: CategoryList;
};

const Content: NextPage<Props> = ({ category, blogWithPlainTextList }) => {
  return (
    <>
      {blogWithPlainTextList.map((blog) => {
        return (
          <BlogCard
            key={blog.id}
            blogsWithPlainText={blog}
            category={category}
          />
        );
      })}
    </>
  );
};

export default Content;
