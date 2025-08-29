import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import dayjs from "dayjs";
import Link from "next/link";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { NextPage } from "next";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import renderToc from "@/libs/blog/renderToc/renderToc";
import TableOfContents from "../TableOfContent/TableOfContent";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  blog: Blog;
  category: CategoryList;
};

const ArticlePageMain: NextPage<Props> = ({ blog, category }) => {
  const toc = renderToc(blog);
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
        <div className={styles.articleContainer}>
          <div className={styles.articleContents}>
            <div
              className={styles.article}
              dangerouslySetInnerHTML={{
                __html: blog.body,
              }}
            />
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
    </Commonlayout>
  );
};

export default ArticlePageMain;
