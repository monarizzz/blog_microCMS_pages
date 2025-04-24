import { NextPage } from "next";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import styles from "@/features/blog/article/components/TagFilter/TagFilter.module.css";

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
                {blogCategory.blogList.contents.map((blogList) => (
                  <BlogCard
                    key={blogCategory.id}
                    blog={blogList}
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
