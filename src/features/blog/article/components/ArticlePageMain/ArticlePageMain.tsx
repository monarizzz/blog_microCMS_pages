import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import dayjs from "dayjs";
import Link from "next/link";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { NextPage } from "next";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: Blog;
  category: CategoryList;
};

const ArticlePageMain: NextPage<Props> = ({ blog, category }) => {
  return (
    <Commonlayout>
      <div className={styles.container}>
        <TagButton category={category} />
        <div className={styles.date}>
          {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
        </div>

        <div className={styles.card}>
          <h2 className={styles.title}>{blog.title}</h2>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
          <Link href="/" className={styles.link}>
            <span>← 記事一覧に戻る</span>
          </Link>
          <div className={styles.date}>
            {blog.publishedAt != blog.revisedAt
              ? dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm") + " " + "更新"
              : null}
          </div>
        </div>
      </div>
    </Commonlayout>
  );
};

export default ArticlePageMain;
