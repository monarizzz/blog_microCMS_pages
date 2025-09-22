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
import Image from "next/image";
import { SVG_HOME } from "@/libs/utils/tag/home";

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
          <div className={styles.home}>
            <Image
              src={SVG_HOME.SRC}
              alt={SVG_HOME.ALT}
              width={10}
              height={10}
              className={styles.homeIcon}
            />
            <span className={styles.homeText}>{TAG.HOME}</span>
          </div>
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
