import { NextPage } from "next";
import Link from "next/link";
import styles from "./Header.module.css";
import { HEADER } from "@/libs/utils/header";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const Header: NextPage<Props> = ({ session }) => {
  return (
    <div className={styles.headerRoot}>
      <Link href="/">
        <span className={styles.title}>{HEADER.TITLE}</span>
      </Link>
      <span className={styles.edit}>
        {session ? <Link href="/edit">{HEADER.EDIT}</Link> : null}
      </span>
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
