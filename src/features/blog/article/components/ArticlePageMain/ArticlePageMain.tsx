import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import dayjs from "dayjs";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import renderToc from "@/libs/blog/renderToc/renderToc";
import TableOfContents from "../TableOfContent/TableOfContent";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import { ArticleNavigation } from "@/infra/microCMS/schema/Blog/articleNavigation";
import Image from "next/image";

type Props = {
  blog: Blog;
  category: CategoryList;
  articleNavigation: ArticleNavigation;
};

const ArticlePageMain: NextPage<Props> = ({
  blog,
  category,
  articleNavigation,
}) => {
  const toc = renderToc(blog);
  return (
    <div className={styles.container}>
      <div className={styles.articleContentHeader}>
        <div className={styles.date}>
          <div className={styles.publishedDate}>
            {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
          </div>
          {blog.publishedAt == blog.revisedAt ? null : (
            <>
              <Image
                src="/update_icon.svg"
                alt="updateIcon"
                width={20}
                height={20}
              />
              {dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm")}
            </>
          )}
        </div>
        <div className={styles.title}>{blog.title}</div>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleContents}>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
          {/* Pagination */}

          <div className={styles.pagination}>
            {articleNavigation.prevArticle && (
              <Link
                href={`/article/${articleNavigation.prevArticle.id}`}
                className={`${styles.prevNextLink} ${styles.prevLink}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.paginationArrow}
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <div className={styles.paginationText}>
                  <span className={styles.paginationLabel}>前の記事</span>
                  <span className={styles.paginationTitle}>
                    {articleNavigation.prevArticle.title}
                  </span>
                </div>
              </Link>
            )}
            {articleNavigation.nextArticle && (
              <Link
                href={`/article/${articleNavigation.nextArticle.id}`}
                className={`${styles.prevNextLink} ${styles.nextLink}`}
              >
                <div className={styles.paginationText}>
                  <span className={styles.paginationLabel}>次の記事</span>
                  <span className={styles.paginationTitle}>
                    {articleNavigation.nextArticle.title}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.paginationArrow}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            )}
          </div>
          <div className={styles.tagGroup}>
            <TagButton category={category} />
          </div>
          <div className={styles.backLink}>
            <Link href="/">← 記事一覧に戻る</Link>
          </div>
        </div>
        <aside className={styles.toc}>
          <TableOfContents toc={toc} />
        </aside>
      </div>
    </div>
  );
};

export default ArticlePageMain;
