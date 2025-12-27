import { ReactNode } from "react";
import Header from "@/features/Layout/Header/Header";
import GithubBtn from "@/features/Layout/GithubBtn/GithubBtn";
import { NextPage } from "next";
import styles from "./LayoutMain.module.css";
import { Session } from "next-auth";

type Props = {
  children: ReactNode;
  session: Session | null;
};

const LayoutMain: NextPage<Props> = ({ children, session }) => {
  return (
    <>
      <Header session={session} />
      {children}
      <div className={styles.btn}>
        <GithubBtn />
      </div>
    </>
  );
};

export default LayoutMain;
