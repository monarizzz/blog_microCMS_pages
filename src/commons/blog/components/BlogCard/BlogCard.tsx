import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "@/commons/date/components/RelativeDate/RelativeDate";
import TagButton from "@/commons/tag/components/TagButton/TagButton";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  BlogWithPlainText: BlogWithPlainText;
};

const BlogWithPlainTextCardGrid = ({ BlogWithPlainText }: Props) => {
  return (
    <div className={styles.blogCardRoot}>
      <div className={styles.tag}>
        {BlogWithPlainText.categories ? (
          <TagButton category={BlogWithPlainText.categories} maxLength={4} />
        ) : null}
      </div>
      <div className={styles.content}>
        <Link href={`/blog/${BlogWithPlainText.id}`}>
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
