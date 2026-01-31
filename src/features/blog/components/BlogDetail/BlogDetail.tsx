import TagButton from "@/commons/tag/components/TagButton/TagButton";
import styles from "./BlogDetail.module.scss";
import Link from "next/link";
import { Blog } from "@/libs/schema/contents/Blog/blog";
import { Category } from "@/libs/schema/contents/Category/category";
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

const BlogDetail = ({ blog, category, blogNavigation }: Props) => {
  const toc = tocFn(blog);
  return (
    <div className={styles.blogDetailRoot}>
      <div className={styles.detail}>
        <TagButton category={category} />
        <div className={styles.title}>{blog.title}</div>
        <div className={styles.postDate}>
          <PostDate blog={blog} />
        </div>
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

export default BlogDetail;
