import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { NextPage } from "next";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogCardGrid.module.css";

type Props = {
  blogWithPlainTextList: BlogWithPlainTextList;
};

const BlogCardGrid: NextPage<Props> = ({ blogWithPlainTextList }) => {
  return (
    <div className={styles.blogCardGridRoot}>
      {blogWithPlainTextList.map((BlogWithPlainText) => (
        <div key={BlogWithPlainText.id} className={styles.blogCard}>
          <BlogCard BlogWithPlainText={BlogWithPlainText} />
        </div>
      ))}
    </div>
  );
};

export default BlogCardGrid;
