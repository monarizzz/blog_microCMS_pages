import TagButton from "@/commons/tag/TagButton/TagButton";
import styles from "./ArticlePage.module.scss";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import renderToc from "@/libs/blog/renderToc/renderToc";
import { CategoryList } from "@/libs/schema/Category/category";
import { ArticleNavigation } from "@/libs/schema/Blog/articleNavigation";
import PostDate from "../PostDate/PostDate";
import PageNav from "../PageNav/PageNav";
import Toc from "../Toc/Toc";

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
          <PageNav articleNavigation={articleNavigation} />

          <div className={styles.tagGroup}>
            <TagButton category={category} />
          </div>
          <div className={styles.backLink}>
            <Link href="/">← 記事一覧に戻る</Link>
          </div>
        </div>
        <div className={styles.toc}>
          <Toc toc={toc} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePageMain;
