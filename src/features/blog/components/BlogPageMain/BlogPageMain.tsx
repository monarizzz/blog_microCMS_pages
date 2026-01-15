import TagButton from "@/commons/tag/components/TagButton/TagButton";
import styles from "./BlogPage.module.scss";
import Link from "next/link";
import { NextPage } from "next";
import { Blog } from "@/libs/schema/Blog/blog";
import { Category } from "@/libs/schema/Category/category";
import PostDate from "../PostDate/PostDate";
import PageNav from "../PageNav/PageNav";
import Toc from "../Toc/Toc";
import tocFn from "../../utils/tocFn";
import { BlogNavigation } from "../../types/blogNavigation";

type Props = {
  blog: Blog;
  category: Category[];
  blogNavigation: BlogNavigation;
};
// TODO: 記事を右に寄せる

const BlogPageMain: NextPage<Props> = ({ blog, category, blogNavigation }) => {
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
            <PageNav blogNavigation={blogNavigation} />
          </div>
          <div className={styles.backLink}>
            <Link href="/">← 記事一覧に戻る</Link>
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
