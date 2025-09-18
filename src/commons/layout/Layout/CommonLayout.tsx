import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./CommonLayout.module.css";

type Props = {
  children: ReactNode;
};

const Commonlayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.header}>
        <Link href="/">
          <span className={styles.title}>ブログ</span>
        </Link>
        <span className={styles.tagGroup}>
          <Link href="/">
            <span className={styles.button}>HOME</span>
          </Link>
          <Link href="/article/recent/tag">
            <span className={styles.button}>CATEGORY</span>
          </Link>
          <Link href="/about">
            <span className={styles.button}>ABOUT</span>
          </Link>
        </span>
      </div>
      <>{children}</>
    </>
  );
};

export default Commonlayout;
