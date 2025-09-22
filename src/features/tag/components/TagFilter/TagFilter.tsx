import { NextPage } from "next";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import styles from "./TagFilter.module.css";
import Content from "../../../../commons/blog/BlogCardList/Content";

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
      {CategoryWithBlogList.map((blog) => (
        <>
          {blog.category.id == queryId ? (
            <ul>
              <li className={styles.tag}>{blog.category.name}</li>
              <li className={styles.blog}>
                {/* TODO:BlogCardをまとめる */}
                <Content
                  category={category}
                  blogWithPlainTextList={blog.blogWithPlainTextList}
                />
              </li>
            </ul>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
