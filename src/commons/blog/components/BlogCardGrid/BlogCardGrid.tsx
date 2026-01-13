import { NextPage } from "next";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogCardGrid.module.css";
import { BlogWithPlainTextList } from "@/features/article/types/blogWithPlainText";

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
