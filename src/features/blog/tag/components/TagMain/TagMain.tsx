import styles from "./TagMain.module.css";
import { useRouter } from "next/router";
import BlogListByCategories from "@/features/blog/tag/components/BlogListByCategories/BlogListByCategories";
import { NextPage } from "next";
import TagFilter from "@/features/blog/tag/components/TagFilter/TagFilter";
import Link from "next/link";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/infra/microCMS/schema/Category/category";
import TagButton from "../../../../../commons/tag/TagButton/TagButton";

type Props = {
  category: CategoryList;
  categoryWithBlogList: CategoryWithBlogList;
};

const TagMain: NextPage<Props> = ({ category, categoryWithBlogList }) => {
  const queryId = `${useRouter().query["id"]}`;
  return (
    <div className={styles.tagMainRoot}>
      <div className={styles.tree}>
        <Link href="/">
          <span className={styles.treeText}>🏠 HOME</span>
        </Link>
        <span className={styles.treeText}> / </span>
        <Link href={""} className={styles.treeTextProduct}>
          <span className={styles.treeText}>CATEGORY</span>
        </Link>
      </div>
      <div className={styles.tagButton}>
        <TagButton category={category} />
      </div>
      {useRouter().query["id"] ? (
        <TagFilter
          queryId={queryId}
          CategoryWithBlogList={categoryWithBlogList}
          category={category}
        />
      ) : (
        <BlogListByCategories
          blogCategoryList={categoryWithBlogList}
          category={category}
        />
      )}
    </div>
  );
};

export default TagMain;
