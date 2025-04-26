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
        <div className={styles.articleContentHeader}>
          <div className={styles.date}>
            <div className={styles.publishedDate}>
              {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
            </div>
            {blog.publishedAt == blog.revisedAt ? null : (
              <>
                <span className={styles.updateIcon}></span>
                {dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm")}
              </>
            )}
          </div>
          <div className={styles.title}>{blog.title}</div>
        </div>
        <div className={styles.articleContents}>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
        </div>
        <div className={styles.tagGroup}>
          <TagButton category={category} />
        </div>
        <div className={styles.link}>
          <Link href="/">← 記事一覧に戻る</Link>
        </div>
      </div>
    </Commonlayout>
  );
};

export default ArticlePageMain;
