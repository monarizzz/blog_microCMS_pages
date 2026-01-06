import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { NextPage } from "next";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogCardGrid.module.scss";

type Props = {
  blogWithPlainTextList: BlogWithPlainTextList;
};

const BlogCardGrid: NextPage<Props> = ({ blogWithPlainTextList }) => {
  return (
    <div className={styles.blogCard}>
      {blogWithPlainTextList.map((BlogWithPlainText) => (
        <BlogCard
          key={BlogWithPlainText.id}
          BlogWithPlainText={BlogWithPlainText}
        />
      ))}
    </div>
  );
};

export default BlogCardGrid;
