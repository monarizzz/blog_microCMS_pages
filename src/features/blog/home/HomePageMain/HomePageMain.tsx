import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { NextPage } from "next";
import { Blog } from "@/infra/microCMS/schema/blog";

type Props = {
  blog: Blog[];
};

const HomeMain: NextPage<Props> = ({ blog }) => {
  return (
    <Commonlayout>
      <div className={styles.container}>
        <div className={styles.title}>ホーム</div>
        {blog.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </Commonlayout>
  );
};

export default HomeMain;
