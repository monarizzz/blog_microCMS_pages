import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  blog: any;
  category: any;
};

const ArticlePageMain: React.FC<Props> = ({ blog, category }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{blog.title}</h2>
      {TagButton({ category })}
      <span className={styles.date}>
        {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
      </span>
      <div className={styles.card}>
        <div
          className={styles.article}
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
        <Link href="/" className={styles.link}>
          <span>← 記事一覧に戻る</span>
        </Link>
        <span className={styles.date}>
          {blog.publishedAt != blog.revisedAt
            ? dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm") + " " + "更新"
            : null}
        </span>
      </div>
    </div>
  );
};

export default ArticlePageMain;
