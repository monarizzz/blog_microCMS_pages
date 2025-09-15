import { NextPage } from "next";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogCategoryList } from "@/infra/microCMS/schema/Blog/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import styles from "@/features/blog/tag/components/TagFilter/TagFilter.module.css";

type Props = {
  queryId: string;
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

const TagFilter: NextPage<Props> = ({
  queryId,
  blogCategoryList,
  category,
}) => {
  return (
    <>
      {blogCategoryList.map((blogCategory) => (
        <>
          {blogCategory.id == queryId ? (
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
