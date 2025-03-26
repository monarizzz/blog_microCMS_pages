import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import styles from "./HomePageMain.module.css";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";

type Props = {
  blog: any;
};

const HomeMain: React.FC<Props> = ({ blog }) => {
  return (
    <Commonlayout>
      <div className={styles.container}>
        <div className={styles.title}>ホーム</div>
        {blog.map((blog) => BlogCard({ blog }))}
      </div>
    </Commonlayout>
  );
};

export default HomeMain;
