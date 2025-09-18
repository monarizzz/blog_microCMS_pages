import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import renderToc from "@/libs/blog/renderToc/renderToc";
import TableOfContents from "../TableOfContent/TableOfContent";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/libs/schema/Blog/articleNavigation";
import Image from "next/image";
import { SVG_ARROW } from "@/libs/utils/microCMS/article/arrow";
import PostDate from "../PostDate/PostDate";

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
        <PostDate blog={blog} />
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
                <Image
                  src={SVG_ARROW.SRC}
                  alt={SVG_ARROW.ALT}
                  width={40}
                  height={40}
                  style={{ transform: "scaleX(-1)" }}
                />
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
                <Image
                  src={SVG_ARROW.SRC}
                  alt={SVG_ARROW.ALT}
                  width={40}
                  height={40}
                />
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
