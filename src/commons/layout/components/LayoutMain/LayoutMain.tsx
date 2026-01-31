import { ReactNode } from "react";
import Header from "@/commons/layout/components/Header/Header";
import GithubBtn from "@/commons/layout/components/GithubBtn/GithubBtn";
import styles from "./LayoutMain.module.css";
import { Session } from "next-auth";

type Props = {
  children: ReactNode;
  session: Session | null;
};

const LayoutMain = ({ children, session }: Props) => {
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
