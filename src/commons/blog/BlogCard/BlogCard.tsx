import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./BlogCard.module.scss";
import RelativeDate from "@/commons/date/RelativeDate/RelativeDate";
import TagButton from "@/commons/tag/TagButton/TagButton";

type Props = {
  blogWithPlainTextList: BlogWithPlainTextList;
};

const BlogCard: NextPage<Props> = ({ blogWithPlainTextList }) => {
  return (
    <>
      {blogWithPlainTextList.map((blog) => (
        <div className={styles.blogCardRoot} key={blog.id}>
          <div className={styles.tag}>
            {blog.categories ? <TagButton category={blog.categories} /> : null}
          </div>
          <div className={styles.content}>
            <Link href={`/article/${blog.id}`}>
              <p className={styles.title}>{blog.title}</p>
              <p className={styles.date}>{RelativeDate(blog.publishedAt)} </p>

              <p className={styles.bodyText}>{blog.plainTextBody}</p>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
