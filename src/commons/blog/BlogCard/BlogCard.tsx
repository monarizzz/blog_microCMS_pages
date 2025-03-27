import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "../../date/RelativeDate/RelativeDate";
import "dayjs/locale/ja";
import { Blog } from "@/infra/microCMS/schema/blog";
import { NextPage } from "next";

type Props = {
  blog: Blog;
};

const BlogCard: NextPage<Props> = ({ blog }) => {
  const publishedDate = new Date(blog.publishedAt);
  return (
    <div className={styles.card}>
      <Link href={`/article/${blog.id}`}>
        <span className={styles.title}>{blog.title}</span>
        <span className={styles.date}>{RelativeDate(publishedDate)} </span>
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
