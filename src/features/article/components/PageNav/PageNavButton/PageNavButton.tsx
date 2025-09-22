import Link from "next/link";
import Image from "next/image";
import styles from "./PageNavButton.module.scss";
import { NextPage } from "next";
import { SVG_ARROW } from "@/libs/utils/article/arrow";

type Props = {
  status: {
    title?: string;
    id?: string;
    text: string;
    style?: string;
  };
};

const PageNavButton: NextPage<Props> = ({ status }) => {
  return (
    <div className={styles.pageNavButtonRoot}>
      <Link
        href={`/article/${status.id}`}
        className={`${styles.nextLink} ${styles.nextLink}`}
      >
        <div className={styles.content}>
          <span className={styles.text}>{status.text}</span>
          <span className={styles.title}>{status.title}</span>
        </div>
        <Image
          src={SVG_ARROW.SRC}
          alt={SVG_ARROW.ALT}
          width={40}
          height={40}
          style={{ transform: status.style }}
        />
      </Link>
    </div>
  );
};

export default PageNavButton;
