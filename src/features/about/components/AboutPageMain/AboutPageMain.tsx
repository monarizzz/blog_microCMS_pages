import { NextPage } from "next";
import styles from "./AboutPageMain.module.css";

const AboutPageMain: NextPage = () => {
  return (
    <div className={styles.AboutPageMain}>
      <ul>
        <li>TypeScript</li>
        <li>Nextjs</li>
      </ul>
      <ul>
        LINKS
        <li>github</li>
      </ul>
    </div>
  );
};

export default AboutPageMain;
