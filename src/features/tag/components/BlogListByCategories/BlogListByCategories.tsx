import { NextPage } from "next";
import styles from "./BlogListCategories.module.css";
import { BlogsByCategoryList } from "@/libs/schema/Category/category";
import BlogCard from "@/commons/blog/components/BlogCard/BlogCard";

type Props = {
  blogCategoryList: BlogsByCategoryList;
};

const BlogListByCategories: NextPage<Props> = ({
  // queryId,
  blogCategoryList,
}) => {
  console.log("blogCategoryList", blogCategoryList);
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
