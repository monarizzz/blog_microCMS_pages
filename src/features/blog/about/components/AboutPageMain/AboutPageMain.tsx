import { NextPage } from "next";
import styles from "./AboutPageMain.module.css";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";

const AboutPageMain: NextPage = () => {
  return (
    <Commonlayout>
      <div className={styles.aboutPageRoot}>
        <div className={styles.title}>about</div>
      </div>
    </Commonlayout>
  );
};

export default AboutPageMain;
