import { NextPage } from "next";
import Link from "next/link";
import styles from "./Header.module.css";
import { HEADER } from "@/libs/utils/header";

type Props = {};

const Header: NextPage<Props> = () => {
  return (
    <div className={styles.headerRoot}>
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
  );
};

export default Header;
