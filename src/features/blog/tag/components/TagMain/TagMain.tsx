import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import styles from "./TagMain.module.css";
import { useRouter } from "next/router";
import BlogListByCategories from "@/features/blog/article/components/BlogListByCategories/BlogListByCategories";
import { NextPage } from "next";
import TagFilter from "@/features/blog/tag/components/TagFilter/TagFilter";
import Link from "next/link";
import { BlogCategoryList } from "@/infra/microCMS/schema/Blog/blogCategory";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";
import TagButton from "../../../../../commons/tag/TagButton/TagButton";

type Props = {
  category: CategoryList;
  blogCategoryList: BlogCategoryList;
};

const TagMain: NextPage<Props> = ({ category, blogCategoryList }) => {
  const queryID = `${useRouter().query["id"]}`;
  return (
    <Commonlayout>
      <div className={styles.container}>
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
            queryID={queryID}
            blogCategoryList={blogCategoryList}
            category={category}
          />
        ) : (
          <BlogListByCategories
            blogCategoryList={blogCategoryList}
            category={category}
          />
        )}
      </div>
    </Commonlayout>
  );
};

export default TagMain;
