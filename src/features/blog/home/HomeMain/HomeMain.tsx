import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomeMain.module.css";

type Props = {
  blog: any;
};

const HomeMain: React.FC<Props> = ({ blog }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ホーム</div>
      {blog.map((blog) => BlogCard({ blog }))}
    </div>
  );
};

export default HomeMain;
