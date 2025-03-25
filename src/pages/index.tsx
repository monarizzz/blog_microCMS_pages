import { client } from "../../libs/client";
import styles from "./index.module.css";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { Blog } from "@/infra/microCMS/schema/blog";

export async function getStaticProps() {
  const data = await client.getList<Blog>({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
}

export default function HomePage({ blog }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ホーム</div>
      {blog.map((blog) => BlogCard({ blog }))}
    </div>
  );
}
