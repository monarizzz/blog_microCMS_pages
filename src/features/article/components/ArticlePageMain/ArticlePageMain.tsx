import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import renderToc from "@/libs/blog/renderToc/renderToc";
import TableOfContents from "../Toc/Toc";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/libs/schema/Blog/articleNavigation";
import PostDate from "../PostDate/PostDate";
import PageNavMain from "../PageNav/PageNavMain";

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
    <div className={styles.articlePageMainRoot}>
      <div className={styles.detail}>
        <PostDate blog={blog} />
        <div className={styles.title}>{blog.title}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
          <PageNavMain articleNavigation={articleNavigation} />

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
