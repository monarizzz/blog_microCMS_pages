import { ReactNode } from "react";
import CommonLayout from "../CommonLayout/CommonLayout";
import GithubBtn from "../GithubBtn/GithubBtn";
import { NextPage } from "next";
import styles from "./LayoutMain.module.css";

type Props = {
  children: ReactNode;
};

const LayoutMain: NextPage<Props> = ({ children }) => {
  return (
    <>
      <CommonLayout />
      {children}
      <div className={styles.btn}>
        <GithubBtn />
      </div>
    </>
  );
};

export default LayoutMain;
