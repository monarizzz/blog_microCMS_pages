import { NextPage } from "next";
import styles from "./CategorizedBlogList.module.css";
import { BlogsByCategory } from "@/libs/schema/Category/category";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";

type Props = {
  queryId: string | null;
  blogCategoryList: BlogsByCategory[];
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
    <>
      {filteredCategories.map((blogCategory) => (
        <div
          key={blogCategory.category.id}
          className={styles.categorizedBlogListRoot}
        >
          <p className={styles.categoryName}>{blogCategory.category.name}</p>
          <BlogCardGrid
            blogWithPlainTextList={blogCategory.blogWithPlainTextList}
          />
        </div>
      ))}
    </>
  );
};

export default CategorizedBlogList;
