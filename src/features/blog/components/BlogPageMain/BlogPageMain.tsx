import TagButton from "@/commons/tag/components/TagButton/TagButton";
import styles from "./BlogPage.module.scss";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import { Category } from "@/libs/schema/Category/category";
import PostDate from "../PostDate/PostDate";
import PageNav from "../PageNav/PageNav";
import Toc from "../Toc/Toc";
import { UTILS_ARTICLE } from "@/libs/utils/blog/article";
import { ArticleNavigation } from "../../types/articleNavigation";
import tocFn from "../../utils/tocFn";

type Props = {
  blog: Blog;
  category: Category[];
  articleNavigation: ArticleNavigation;
};
// TODO: 記事を右に寄せる

const BlogPageMain: NextPage<Props> = ({
  blog,
  category,
  articleNavigation,
}) => {
  const toc = tocFn(blog);
  return (
    <div className={styles.blogPageMainRoot}>
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

export default BlogPageMain;
