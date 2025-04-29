import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "../../date/RelativeDate/RelativeDate";
import "dayjs/locale/ja";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { NextPage } from "next";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: Blog;
  category: CategoryList;
};

const BlogCard: NextPage<Props> = ({ blog, category }) => {
  const publishedDate = new Date(blog.publishedAt);
  return (
    <div className={styles.card}>
      <Link href={`/article/${blog.id}`}>
        <div className={styles.title}>{blog.title}</div>
        <div className={styles.date}>{RelativeDate(publishedDate)} </div>
        <>
          {category.map((tag) =>
            blog.categories.map((articleCategory) =>
              tag.id == articleCategory.id ? (
                <span className={styles.tag} key={tag.id}>
                  {tag.name}
                </span>
              ) : null
            )
          )}
        </>
        <div
          className={styles.bodyText}
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
      </Link>
    </div>
  );
};

export default BlogCard;
