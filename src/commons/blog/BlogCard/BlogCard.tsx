import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "../../date/RelativeDate";
import "dayjs/locale/ja";

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.card}>
      <Link href={`./article/${blog.id}`}>
        <span className={styles.title}>{blog.title}</span>
        <span className={styles.date}>{RelativeDate(blog.publishedAt)} </span>
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
