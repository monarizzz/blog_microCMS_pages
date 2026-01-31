import Link from "next/link";
import Image from "next/image";
import styles from "./PageNav.module.scss";
import { SVG_ARROW } from "@/libs/utils/blog/arrow";
import { PAGE_NAV } from "@/libs/utils/blog/pageNav";
import { BlogNavigation } from "../../types/blogNavigation";

type Props = {
  blogNavigation: BlogNavigation;
};

const PageNav = ({ blogNavigation }: Props) => {
  const { prevBlog, nextBlog } = blogNavigation;
  const size = 7;
  return (
    <div className={styles.pageNavRoot}>
      {prevBlog ? (
        <Link href={`/blog/${prevBlog.id}`} className={styles.button}>
          <Image
            src={SVG_ARROW.SRC}
            alt={SVG_ARROW.ALT}
            width={size}
            height={size}
            style={{ transform: "scaleX(-1)" }}
          />
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.BACK}</span>
            <span className={styles.title}>{prevBlog.title}</span>
          </div>
        </Link>
      ) : null}
      {nextBlog ? (
        <Link
          href={`/blog/${nextBlog.id}`}
          className={`${styles.button} ${styles.nextLink}`}
        >
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.NEXT}</span>
            <span className={styles.title}>{nextBlog.title}</span>
          </div>
          <Image
            src={SVG_ARROW.SRC}
            alt={SVG_ARROW.ALT}
            width={size}
            height={size}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default PageNav;
