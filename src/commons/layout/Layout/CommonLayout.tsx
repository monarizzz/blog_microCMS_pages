import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./CommonLayout.module.css";
import { HEADER } from "@/libs/utils/header";

type Props = {
  children: ReactNode;
};

const CommonLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.commonLayoutRoot}>
        <Link href="/">
          <span className={styles.title}>{HEADER.TITLE}</span>
        </Link>
        <span className={styles.group}>
          <Link href="/">
            <span className={styles.button}>{HEADER.HOME}</span>
          </Link>
          <Link href="/article/recent/tag">
            <span className={styles.button}>{HEADER.CATEGORY}</span>
          </Link>
          <Link href="/about">
            <span className={styles.button}>{HEADER.ABOUT}</span>
          </Link>
        </span>
      </div>
      <>{children}</>
    </>
  );
};

export default CommonLayout;
