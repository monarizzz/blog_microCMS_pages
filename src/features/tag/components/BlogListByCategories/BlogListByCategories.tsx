import { NextPage } from "next";
import styles from "./BlogListCategories.module.css";
import { CategoryWithBlogList } from "@/libs/schema/Category/category";
import BlogCard from "@/commons/blog/components/BlogCard/BlogCard";

type Props = {
  blogCategoryList: CategoryWithBlogList;
};

const BlogListByCategories: NextPage<Props> = ({ blogCategoryList }) => {
  return (
    <div className={styles.blogListByCategoriesRoot}>
      {blogCategoryList.map((blogCategory) => (
        <ul key={blogCategory.category.id} className={styles.content}>
          <span className={styles.tag}>{blogCategory.category.name}</span>
          <div className={styles.blog}>
            <BlogCard
              blogWithPlainTextList={blogCategory.blogWithPlainTextList}
            />
          </div>
        </ul>
      ))}
    </div>
  );
};

export default BlogListByCategories;
