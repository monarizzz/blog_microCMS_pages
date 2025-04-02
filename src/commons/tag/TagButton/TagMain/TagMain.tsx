import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import styles from "./TagMain.module.css";
import TagButton from "../TagButton";
import { useRouter } from "next/router";
import BlogListByCategories from "@/features/blog/article/components/BlogListByCategories/BlogListByCategories";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { NextPage } from "next";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import TagFilter from "@/features/blog/article/components/TagFilter/TagFilter";

type Props = {
  category: CategoryList;
  blogCategoryList: BlogCategoryList;
};

const TagMain: NextPage<Props> = ({ category, blogCategoryList }) => {
  console.log(useRouter().query["id"]);
  return (
    <Commonlayout>
      <div className={styles.container}>
        <div className={styles.title}>タグページ</div>
        <div className={styles.tagButton}>
          <TagButton category={category} />
        </div>
        {useRouter().query["id"] ? (
          <TagFilter categoryID={`${useRouter().query["id"]}`} />
        ) : (
          <BlogListByCategories blogCategoryList={blogCategoryList} />
        )}
      </div>
    </Commonlayout>
  );
};

export default TagMain;
