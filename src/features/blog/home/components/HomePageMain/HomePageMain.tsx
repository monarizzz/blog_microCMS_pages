import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
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
    <Commonlayout>
      <div className={styles.container}>
        <Link href={""} className={styles.title}>
          ホーム
        </Link>
        {blog.map((blog) => (
          <BlogCard key={blog.id} blog={blog} category={category} />
        ))}
      </div>
    </Commonlayout>
  );
};

export default HomeMain;
