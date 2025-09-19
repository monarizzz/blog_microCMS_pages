import Link from "next/link";
import styles from "./BlogCard.module.scss";
import RelativeDate from "../../date/RelativeDate/RelativeDate";
import "dayjs/locale/ja";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainText } from "@/libs/schema/Blog/blog";

type Props = {
  blogsWithPlainText: BlogWithPlainText;
  category: CategoryList;
};

const BlogCard: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  const publishedDate = new Date(blogsWithPlainText.publishedAt);

  return (
    <div className={styles.blogCardRoot}>
      <Link href={`/article/${blogsWithPlainText.id}`}>
        <p className={styles.title}>{blogsWithPlainText.title}</p>
        <p className={styles.date}>{RelativeDate(publishedDate)} </p>
        {category.map((tag) =>
          blogsWithPlainText.categories.map((articleCategory: { id: string }) =>
            tag.id == articleCategory.id ? (
              <span className={styles.tag} key={tag.id}>
                {tag.name}
              </span>
            ) : null
          )
        )}
        <p className={styles.bodyText}>{blogsWithPlainText.plainTextBody}</p>
      </Link>
    </div>
  );
};

export default BlogCard;
