import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { NextPage } from "next";
import styles from "./BlogListCategories.module.css";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";

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
        <>
          <div
            key={blogCategory.category.id}
            className={styles.blogListByCategories}
          >
            <div>
              <span className={styles.tagName}>
                {blogCategory.category.name}
              </span>
            </div>
            <div className={styles.blogList}>
              {blogCategory.blogWithPlainTextList.map((blog) => {
                return (
                  <BlogCard
                    key={blog.id}
                    blogsWithPlainText={blog}
                    category={category}
                  />
                );
              })}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default BlogListByCategories;
