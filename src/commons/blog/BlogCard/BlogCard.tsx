import Link from "next/link";
import styles from "./BlogCard.module.css";
import RelativeDate from "../../date/RelativeDate/RelativeDate";
import "dayjs/locale/ja";
import { NextPage } from "next";
import { BlogWithPlainText } from "@/infra/microCMS/schema/Blog/blogWithPlainText";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  blogsWithPlainText: BlogWithPlainText;
  category: CategoryList;
};

const BlogCard: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  const publishedDate = new Date(blogsWithPlainText.publishedAt);

  return (
    <div className={styles.card}>
      <Link href={`/article/${blogsWithPlainText.id}`}>
        <div className={styles.title}>{blogsWithPlainText.title}</div>
        <div className={styles.date}>{RelativeDate(publishedDate)} </div>
        <>
          {category.map((tag) =>
            blogsWithPlainText.categories.map((articleCategory) =>
              tag.id == articleCategory.id ? (
                <span className={styles.tag} key={tag.id}>
                  {tag.name}
                </span>
              ) : null
            )
          )}
        </>
        <div className={styles.bodyText}>
          {blogsWithPlainText.plainTextBody}
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
