import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { CategoryList } from "@/libs/schema/Category/category";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./BlogCard.module.scss";
import RelativeDate from "@/commons/date/RelativeDate/RelativeDate";

type Props = {
  blogWithPlainTextList: BlogWithPlainTextList;
  category: CategoryList;
};

const BlogCard: NextPage<Props> = ({ category, blogWithPlainTextList }) => {
  return (
    <>
      {blogWithPlainTextList.map((blog) => {
        return (
          <div className={styles.list} key={blog.id}>
            <Link href={`/article/${blog.id}`}>
              <p className={styles.title}>{blog.title}</p>
              <p className={styles.date}>{RelativeDate(blog.publishedAt)} </p>
              {category.map((tag) =>
                blog.categories.map((articleCategory: { id: string }) =>
                  tag.id == articleCategory.id ? (
                    <span className={styles.tag} key={tag.id}>
                      {tag.name}
                    </span>
                  ) : null
                )
              )}
              <p className={styles.bodyText}>{blog.plainTextBody}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default BlogCard;
