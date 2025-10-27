import { NextPage } from "next";
import { CategoryWithBlogList } from "@/libs/schema/Category/category";
import styles from "./TagFilter.module.css";
import BlogCard from "../../../../commons/blog/BlogCard/BlogCard";

type Props = {
  queryId: string;
  CategoryWithBlogList: CategoryWithBlogList;
};

const TagFilter: NextPage<Props> = ({ queryId, CategoryWithBlogList }) => {
  return (
    <>
      {CategoryWithBlogList.map((blog) => (
        <>
          {blog.category.id == queryId ? (
            <ul>
              <li className={styles.tag}>{blog.category.name}</li>
              <li className={styles.blog}>
                <BlogCard blogWithPlainTextList={blog.blogWithPlainTextList} />
              </li>
            </ul>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
