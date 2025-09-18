import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  return (
    <div className={styles.homePageRoot}>
      <div className={styles.container}>
        <div className={styles.title}>一覧</div>
        <div className={styles.blogList}>
          {blogsWithPlainText.map((blogsWithPlainText) => (
            <BlogCard
              key={blogsWithPlainText.id}
              blogsWithPlainText={blogsWithPlainText}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
