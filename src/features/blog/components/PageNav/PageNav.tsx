import Link from "next/link";
import Image from "next/image";
import styles from "./PageNav.module.scss";
import { NextPage } from "next";
import { SVG_ARROW } from "@/libs/utils/blog/arrow";
import { PAGE_NAV } from "@/libs/utils/blog/pageNav";
import { ArticleNavigation } from "../../types/articleNavigation";

type Props = {
  articleNavigation: ArticleNavigation;
};

const PageNav: NextPage<Props> = ({ articleNavigation }) => {
  const { prevArticle, nextArticle } = articleNavigation;
  const size = 7;
  return (
    <div className={styles.pageNavRoot}>
      {prevArticle ? (
        <Link href={`/article/${prevArticle.id}`} className={styles.button}>
          <Image
            src={SVG_ARROW.SRC}
            alt={SVG_ARROW.ALT}
            width={size}
            height={size}
            style={{ transform: "scaleX(-1)" }}
          />
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.BACK}</span>
            <span className={styles.title}>{prevArticle.title}</span>
          </div>
        </Link>
      ) : null}
      {nextArticle ? (
        <Link
          href={`/article/${nextArticle.id}`}
          className={`${styles.button} ${styles.nextLink}`}
        >
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.NEXT}</span>
            <span className={styles.title}>{nextArticle.title}</span>
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
