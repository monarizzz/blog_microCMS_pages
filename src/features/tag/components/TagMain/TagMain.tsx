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
  const size = 10;
  return (
    <div className={styles.tagMainRoot}>
      <div className={styles.path}>
        <Link href="/" className={styles.pathLink}>
          <Image
            src={SVG_HOME.SRC}
            alt={SVG_HOME.ALT}
            width={size}
            height={size}
          />
          <span>{TAG.HOME}</span>
        </Link>
        <span className={styles.separator}>/</span>
        <Link href={""} className={styles.pathLink}>
          {TAG.CATEGORY}
        </Link>
      </div>
      <div className={styles.tag}>
        <TagButton category={category} />
      </div>
      {useRouter().query["id"] ? (
        <TagFilter
          queryId={queryId}
          CategoryWithBlogList={categoryWithBlogList}
        />
      ) : (
        // TODO: 命名がわかりにくすぎる
        <BlogListByCategories blogCategoryList={categoryWithBlogList} />
      )}
    </div>
  );
};

export default TagMain;
