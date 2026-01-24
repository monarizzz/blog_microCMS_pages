import styles from "./PostDate.module.css";
import dayjs from "dayjs";
import { NextPage } from "next";
import { SVG_UPDATE } from "@/libs/utils/blog/update";
import { Blog } from "@/libs/schema/contents/Blog/blog";
import Image from "next/image";

type Props = {
  blog: Blog;
};

const PostDate: NextPage<Props> = ({ blog }) => {
  return (
    <div className={styles.dateRoot}>
      <p className={styles.published}>
        {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
      </p>
      {blog.publishedAt !== blog.revisedAt && (
        <div className={styles.update}>
          <Image
            src={SVG_UPDATE.SRC}
            alt={SVG_UPDATE.ALT}
            width={15}
            height={15}
            className={styles.icon}
          />
          <p className={styles.published}>
            {dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostDate;
