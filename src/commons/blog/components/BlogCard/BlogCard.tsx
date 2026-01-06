import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "@/commons/date/components/RelativeDate/RelativeDate";
import TagButton from "@/commons/tag/components/TagButton/TagButton";
import { BlogWithPlainText } from "@/libs/schema/Blog/blog";
import { NextPage } from "next";

type Props = {
  BlogWithPlainText: BlogWithPlainText;
};

const BlogWithPlainTextCardGrid: NextPage<Props> = ({ BlogWithPlainText }) => {
  return (
    <div className={styles.blogCardRoot}>
      <p className={styles.tag}>
        {BlogWithPlainText.categories ? (
          <TagButton category={BlogWithPlainText.categories} />
        ) : null}
      </p>
      <div className={styles.content}>
        <Link href={`/article/${BlogWithPlainText.id}`}>
          <p className={styles.title}>{BlogWithPlainText.title}</p>
          <p className={styles.date}>
            {RelativeDate(BlogWithPlainText.publishedAt)}{" "}
          </p>
          <p className={styles.bodyText}>{BlogWithPlainText.plainTextBody}</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogWithPlainTextCardGrid;
