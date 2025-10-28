import { ReactNode } from "react";
import Header from "../../../features/Layout/Header/Header";
import GithubBtn from "../../../features/Layout/GithubBtn/GithubBtn";
import { NextPage } from "next";
import styles from "./LayoutMain.module.css";

type Props = {
  children: ReactNode;
};

const LayoutMain: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div className={styles.btn}>
        <GithubBtn />
      </div>
    </>
  );
};

export default LayoutMain;
