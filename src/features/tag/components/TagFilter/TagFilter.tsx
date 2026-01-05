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
      {blogsByCategoryList.map((blogCategory) =>
        blogCategory.category.id == queryId ? (
          <ul key={blogCategory.category.id}>
            <li className={styles.tag}>{blogCategory.category.name}</li>
            <li className={styles.blog}>
              <BlogCard
                blogWithPlainTextList={blogCategory.blogWithPlainTextList}
              />
            </li>
          </ul>
        ) : null
      )}
    </>
  );
};

export default TagFilter;
