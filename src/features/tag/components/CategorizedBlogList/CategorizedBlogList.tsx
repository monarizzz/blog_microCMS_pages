import { NextPage } from "next";
import styles from "./CategorizedBlogList.module.css";
import { BlogsByCategoryList } from "@/libs/schema/Category/category";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";

type Props = {
  queryId: string | null;
  blogCategoryList: BlogsByCategoryList;
};

const CategorizedBlogList: NextPage<Props> = ({
  queryId,
  blogCategoryList,
}) => {
  const filteredCategories = queryId
    ? blogCategoryList.filter(
        (blogCategory) => blogCategory.category.id === queryId
      )
    : blogCategoryList;

  return (
    <div className={styles.categorizedBlogListRoot}>
      {filteredCategories.map((blogCategory) => (
        <div key={blogCategory.category.id}>
          <p className={styles.categoryName}>{blogCategory.category.name}</p>
          <div className={styles.blogCard}>
            <BlogCardGrid
              blogWithPlainTextList={blogCategory.blogWithPlainTextList}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorizedBlogList;
