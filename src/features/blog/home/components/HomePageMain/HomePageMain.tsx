import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import CommonLayout from "@/commons/layout/Layout/CommonLayout";
import { NextPage } from "next";
import { BlogWithPlainTextList } from "@/infra/microCMS/schema/Blog/blogWithPlainText";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  return (
    <CommonLayout>
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
    </CommonLayout>
  );
};

export default HomeMain;
