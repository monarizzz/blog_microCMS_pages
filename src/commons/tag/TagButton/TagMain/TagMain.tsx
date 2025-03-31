import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import styles from "./TagMain.module.css";
import TagButton from "../TagButton";
import { useRouter } from "next/router";
import BlogListByCategories from "@/features/blog/BlogListByCategories/BlogListByCategories";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { NextPage } from "next";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogListByCategory/blogCategoryList";

type Props = {
  category: CategoryList;
  blogListObject: BlogCategoryList;
};

const TagMain: NextPage<Props> = ({ category, blogListObject }) => {
  console.log(blogListObject);
  return (
    <Commonlayout>
      <div className={styles.container}>
        <div className={styles.title}>タグページ</div>
        <div className={styles.tagButton}>
          <TagButton category={category} />
        </div>
        {useRouter().query["id"] ? (
          <div>filter</div> // クエリにidがある場合の処理をかく
        ) : (
          <BlogListByCategories blogListObject={blogListObject} />
        )}
      </div>
    </Commonlayout>
  );
};

export default TagMain;
