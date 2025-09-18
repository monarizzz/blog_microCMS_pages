import { NextPage } from "next";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import styles from "./TagFilter.module.css";

type Props = {
  queryId: string;
  CategoryWithBlogList: CategoryWithBlogList;
  category: CategoryList;
};

const TagFilter: NextPage<Props> = ({
  queryId,
  CategoryWithBlogList,
  category,
}) => {
  return (
    <>
      {CategoryWithBlogList.map((CategoryWithBlog) => (
        <>
          {CategoryWithBlog.category.id == queryId ? (
            <>
              <div className={styles.tagName}>
                {CategoryWithBlog.category.name}
              </div>
              <div className={styles.blogList}>
                {CategoryWithBlog.blogWithPlainTextList.map((blogList) => (
                  <BlogCard
                    key={CategoryWithBlog.category.id}
                    blogsWithPlainText={blogList}
                    category={category}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
