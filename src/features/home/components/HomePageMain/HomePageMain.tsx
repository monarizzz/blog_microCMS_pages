import styles from "./HomePageMain.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";
import { UTILS_HOME } from "@/libs/utils/article/home/home";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blogsWithPlainText }) => {
  return (
    <div className={styles.homePageRoot}>
      <p className={styles.title}>{UTILS_HOME.HOME}</p>
      <BlogCardGrid blogWithPlainTextList={blogsWithPlainText} />
    </div>
  );
};

export default HomeMain;
