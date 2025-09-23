import styles from "./HomePageMain.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import Content from "@/commons/blog/BlogCard/BlogCard";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  return (
    <div className={styles.homePageRoot}>
      <div className={styles.title}>一覧</div>
      <div className={styles.blogList}>
        <Content
          category={category}
          blogWithPlainTextList={blogsWithPlainText}
        />
      </div>
    </div>
  );
};

export default HomeMain;
