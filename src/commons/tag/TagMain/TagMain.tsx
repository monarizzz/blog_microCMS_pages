import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import styles from "./TagMain.module.css";
import TagButton from "../TagButton/TagButton";
import { useRouter } from "next/router";
import BlogListByCategories from "@/features/blog/BlogListByCategories/BlogListByCategories";

const TagMain = ({ category, blogListObject }) => {
  return (
    <Commonlayout>
      <div className={styles.container}>
        <div className={styles.title}>タグページ</div>
        <div className={styles.tagButton}>{TagButton({ category })}</div>
        {useRouter().query["id"] ? (
          <div>filter</div> // クエリにidがある場合の処理をかく
        ) : (
          BlogListByCategories({ category, blogListObject })
        )}
      </div>
    </Commonlayout>
  );
};

export default TagMain;
