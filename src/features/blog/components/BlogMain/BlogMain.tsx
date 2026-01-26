"use client";

import styles from "./BlogMain.module.css";
import { NextPage } from "next";
import Link from "next/link";
import {
  CategoryList,
  BlogsByCategory,
} from "@/libs/schema/contents/Category/category";
import TagButton from "@/commons/tag/components/TagButton/TagButton";
import CategorizedBlogList from "../CategorizedBlogList/CategorizedBlogList";
import { TAG } from "@/libs/utils/tag/tag";
import Image from "next/image";
import { SVG_HOME } from "@/libs/utils/tag/home";
import { useSearchParams } from "next/navigation";

type Props = {
  category: CategoryList;
  categoryWithBlogList: BlogsByCategory[];
};

const BlogMain: NextPage<Props> = ({ category, categoryWithBlogList }) => {
  // TODO:子でパスを取得するように変更、親からクライアントで動作しているため
  const queryId = useSearchParams()?.get("cat") ?? undefined;
  const size = 10;
  return (
    <div className={styles.tagMainRoot}>
      <div className={styles.header}>
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
          <Link href={"/blog"} className={styles.pathLink}>
            {TAG.CATEGORY}
          </Link>
        </div>
        <div className={styles.tag}>
          <TagButton category={category} />
        </div>
      </div>
      <div className={styles.categorizedBlogList}>
        <CategorizedBlogList
          queryId={queryId}
          blogCategoryList={categoryWithBlogList}
        />
      </div>
    </div>
  );
};

export default BlogMain;
