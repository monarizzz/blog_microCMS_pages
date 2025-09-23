import { NextPage } from "next";
import styles from "./BlogListCategories.module.css";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import Content from "../../../../commons/blog/BlogCard/BlogCard";

type Props = {
  category: CategoryList;
  blogCategoryList: CategoryWithBlogList;
};

const BlogListByCategories: NextPage<Props> = ({
  category,
  blogCategoryList,
}) => {
  return (
    <div className={styles.blogListByCategoriesRoot}>
      {blogCategoryList.map((blogCategory) => (
        <ul key={blogCategory.category.id} className={styles.content}>
          <span className={styles.tag}>{blogCategory.category.name}</span>
          <div className={styles.blog}>
            <Content
              category={category}
              blogWithPlainTextList={blogCategory.blogWithPlainTextList}
            />
          </div>
        </ul>
      ))}
    </div>
  );
};

export default BlogListByCategories;
