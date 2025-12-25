import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.scss";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/libs/schema/Blog/articleNavigation";
import PostDate from "../PostDate/PostDate";
import PageNav from "../PageNav/PageNav";
import Toc from "../TOC/TableOfContents";
import { UTILS_ARTICLE } from "@/libs/utils/article/article";
import tocFn from "@/libs/blog/toc/tocFn";

type Props = {
  blog: Blog;
  category: CategoryList;
  articleNavigation: ArticleNavigation;
};
// TODO: 記事を右に寄せる

const ArticlePageMain: NextPage<Props> = ({
  blog,
  category,
  articleNavigation,
}) => {
  const toc = tocFn(blog);
  return (
    <div className={styles.articlePageMainRoot}>
      <div className={styles.detail}>
        <div className={styles.tagGroup}>
          <TagButton category={category} />
          <PostDate blog={blog} />
        </div>
        <div className={styles.title}>{blog.title}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
          <div className={styles.pageNav}>
            <PageNav articleNavigation={articleNavigation} />
          </div>
          <div className={styles.backLink}>
            <Link href="/">{UTILS_ARTICLE.BACK}</Link>
          </div>
        </div>
        <div className={styles.right}>
          <Toc toc={toc} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePageMain;
