import styles from "./HomePageMain.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { UTILS_HOME } from "@/libs/utils/article/home/home";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blogsWithPlainText }) => {
  return (
    <div className={styles.homePageRoot}>
      <div className={styles.title}>{UTILS_HOME.HOME}</div>
      <div className={styles.blogcard}>
        <BlogCard blogWithPlainTextList={blogsWithPlainText} />
      </div>
    </div>
  );
};

export default HomeMain;
