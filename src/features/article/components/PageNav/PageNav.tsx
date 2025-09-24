import Link from "next/link";
import Image from "next/image";
import styles from "./PageNav.module.scss";
import { NextPage } from "next";
import { ArticleNavigation } from "@/infra/schema/Blog/articleNavigation";
import { SVG_ARROW } from "@/libs/utils/article/arrow";
import { PAGE_NAV } from "@/libs/utils/article/pageNav";

type Props = {
  articleNavigation: ArticleNavigation;
};

const PageNav: NextPage<Props> = ({ articleNavigation }) => {
  const { prevArticle, nextArticle } = articleNavigation;

  return (
    <div className={styles.pageNavRoot}>
      {prevArticle ? (
        <Link href={`/article/${prevArticle.id}`} className={styles.link}>
          <Image
            src={SVG_ARROW.SRC}
            alt={SVG_ARROW.ALT}
            width={40}
            height={40}
            style={{ transform: "scaleX(-1)" }}
          />
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.BACK}</span>
            <span className={styles.title}>{prevArticle.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextArticle ? (
        <Link
          href={`/article/${nextArticle.id}`}
          className={`${styles.link} ${styles.nextLink}`}
        >
          <div className={styles.content}>
            <span className={styles.text}>{PAGE_NAV.NEXT}</span>
            <span className={styles.title}>{nextArticle.title}</span>
          </div>
          <Image
            src={SVG_ARROW.SRC}
            alt={SVG_ARROW.ALT}
            width={40}
            height={40}
          />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PageNav;
