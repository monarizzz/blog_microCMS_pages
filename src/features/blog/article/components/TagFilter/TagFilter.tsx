import { NextPage } from "next";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "@/features/blog/article/components/TagFilter/TagFilter.module.css";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  queryID: string;
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

const TagFilter: NextPage<Props> = ({
  queryID,
  blogCategoryList,
  category,
}) => {
  return (
    <>
      {blogCategoryList.map((blogCategory) => (
        <>
          {blogCategory.id == queryID ? (
            <>
              <div className={styles.tagName}>{blogCategory.name}</div>
              <div className={styles.blogList}>
                {blogCategory.blogWithPlainTextList.map((blogList) => (
                  <BlogCard
                    key={blogCategory.id}
                    blogsWithPlainText={blogList}
                    category={category}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
