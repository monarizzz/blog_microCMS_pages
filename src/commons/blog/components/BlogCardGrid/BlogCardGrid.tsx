import { NextPage } from "next";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogCardGrid.module.css";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  blogWithPlainTextList: BlogWithPlainText[];
};

const BlogCardGrid: NextPage<Props> = ({ blogWithPlainTextList }) => {
  return (
    <div className={styles.blogCardGridRoot}>
      {blogWithPlainTextList.map((BlogWithPlainText: BlogWithPlainText) => (
        <div key={BlogWithPlainText.id} className={styles.blogCard}>
          <BlogCard BlogWithPlainText={BlogWithPlainText} />
        </div>
      ))}
    </div>
  );
};

export default BlogCardGrid;
