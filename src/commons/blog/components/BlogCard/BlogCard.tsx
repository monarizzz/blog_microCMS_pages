import Link from "next/link";
import styles from "./BlogCard.module.css";
import relativeDate from "@/features/blog/utils/relativeDate";
import TagButton from "@/commons/tag/components/TagButton/TagButton";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  BlogWithPlainText: BlogWithPlainText;
};

const BlogCard = ({ BlogWithPlainText }: Props) => {
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
            {relativeDate(BlogWithPlainText.publishedAt)}{" "}
          </p>
          <p className={styles.bodyText}>{BlogWithPlainText.plainTextBody}</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
