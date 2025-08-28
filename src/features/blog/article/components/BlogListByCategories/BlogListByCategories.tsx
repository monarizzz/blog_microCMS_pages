import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { NextPage } from "next";
import styles from "@/features/blog/article/components/BlogListByCategories/BlogListCategories.module.css";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  category: CategoryList;
  blogCategoryList: BlogCategoryList;
};

const BlogListByCategories: NextPage<Props> = ({
  category,
  blogCategoryList,
}) => {
  return (
    <div className={styles.blogGroup}>
      {blogCategoryList.map((blogCategory) => (
        <>
          <div key={blogCategory.id} className={styles.BlogListByCategories}>
            <div>
              <span className={styles.tagName}>{blogCategory.name}</span>
            </div>
            <div className={styles.blogList}>
              {blogCategory.blogWithPlainTextList.map((blog) => {
                console.log(blog);
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
