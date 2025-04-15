import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import CommonLayout from "@/commons/layout/Layout/CommonLayout";
import { NextPage } from "next";
import { BlogList } from "@/infra/microCMS/schema/Blog/blogList";
import Link from "next/link";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: BlogList;
  category: CategoryList;
};

const HomeMain: NextPage<Props> = ({ blog, category }) => {
  return (
    <CommonLayout>
      <div className={styles.container}>
        <Link href={""} className={styles.title}>
          ホーム
        </Link>
        <div className={styles.blogList}>
          {blog.map((blog) => (
            <BlogCard key={blog.id} blog={blog} category={category} />
          ))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default HomeMain;
