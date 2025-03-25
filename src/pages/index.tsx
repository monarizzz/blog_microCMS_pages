import { client } from "../../libs/client";
import styles from "./index.module.css";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { Blog } from "@/infra/microCMS/schema/blog";

export const getServerSideProps = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 15 },
  });
  return {
    props: {
      blog: data.contents,
    },
  };
};

const HomePage = ({ blog }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ホーム</div>
      {blog.map((blog) => BlogCard({ blog }))}
    </div>
  );
};

export default HomePage;
