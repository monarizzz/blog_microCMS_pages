import { NextPage } from "next";
import styles from "./BlogListCategories.module.css";
import { BlogsByCategoryList } from "@/libs/schema/Category/category";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";

type Props = {
  queryId: string | null;
  blogCategoryList: BlogsByCategoryList;
};

const BlogListByCategories: NextPage<Props> = ({
  queryId,
  blogCategoryList,
}) => {
  const filteredCategories = queryId
    ? blogCategoryList.filter(
        (blogCategory) => blogCategory.category.id === queryId
      )
    : blogCategoryList;

  return (
    <div className={styles.blogListByCategoriesRoot}>
      {filteredCategories.map((blogCategory) => (
        <div key={blogCategory.category.id} className={styles.content}>
          <p className={styles.tag}>{blogCategory.category.name}</p>
          <BlogCardGrid
            blogWithPlainTextList={blogCategory.blogWithPlainTextList}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogListByCategories;
