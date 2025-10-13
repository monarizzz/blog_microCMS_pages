import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./CommonLayout.module.css";
import { HEADER } from "@/libs/utils/header";
import { Session } from "@/infra/auth/google/session";

type Props = {
  children: ReactNode;
  session: Session | null;
};

const Commonlayout: NextPage<Props> = ({ children, session }) => {
  return (
    <>
      <div className={styles.commonLayoutRoot}>
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
      <>{children}</>
    </>
  );
};

export default Commonlayout;
