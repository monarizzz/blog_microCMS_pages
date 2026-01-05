import { NextPage } from "next";
import { BlogsByCategoryList } from "@/libs/schema/Category/category";
import styles from "./TagFilter.module.css";
import BlogCard from "@/commons/blog/components/BlogCard/BlogCard";

type Props = {
  queryId: string;
  blogsByCategoryList: BlogsByCategoryList;
};

const TagFilter: NextPage<Props> = ({ queryId, blogsByCategoryList }) => {
  return (
    <>
      {blogsByCategoryList.map((blog) =>
        blog.category.id == queryId ? (
          <ul key={blog.category.id}>
            <li className={styles.tag}>{blog.category.name}</li>
            <li className={styles.blog}>
              <BlogCard blogWithPlainTextList={blog.blogWithPlainTextList} />
            </li>
          </ul>
        ) : null
      )}
    </>
  );
};

export default TagFilter;
