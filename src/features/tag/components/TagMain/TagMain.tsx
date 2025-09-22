import styles from "./TagMain.module.css";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import TagButton from "../../../../commons/tag/TagButton/TagButton";
import TagFilter from "../TagFilter/TagFilter";
import BlogListByCategories from "../BlogListByCategories/BlogListByCategories";
import { TAG } from "@/libs/utils/tag/tag";

type Props = {
  category: CategoryList;
  categoryWithBlogList: CategoryWithBlogList;
};

const TagMain: NextPage<Props> = ({ category, categoryWithBlogList }) => {
  const queryId = `${useRouter().query["id"]}`;
  return (
    <div className={styles.tagMainRoot}>
      {/* TODO: 処理綺麗にする */}
      <div className={styles.path}>
        <Link href="/">
          <span className={styles.treeText}>{TAG.HOME}</span>
        </Link>
        <span className={styles.treeText}> / </span>
        <Link href={""} className={styles.treeTextProduct}>
          <span className={styles.treeText}>{TAG.CATEGORY}</span>
        </Link>
      </div>
      <div className={styles.button}>
        <TagButton category={category} />
      </div>
      {useRouter().query["id"] ? (
        <TagFilter
          queryId={queryId}
          CategoryWithBlogList={categoryWithBlogList}
          category={category}
        />
      ) : (
        // TODO: 命名がわかりにくすぎる
        <BlogListByCategories
          blogCategoryList={categoryWithBlogList}
          category={category}
        />
      )}
    </div>
  );
};

export default TagMain;
