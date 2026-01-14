import { NextPage } from "next";
import styles from "./AboutPageMain.module.css";
import SkillTags from "../SkillTag/SkillTag";

const skill = ["Next.js", "TypeScript"];

const AboutPageMain: NextPage = () => {
  return (
    <div className={styles.AboutPageMain}>
      <ul>
        <li>TypeScript</li>
        <li>Nextjs</li>
      </ul>
      LINKS
      <div className={styles.tags}>
        {skill.map((name, i) => (
          <SkillTags key={i} skill={name} />
        ))}
      </div>
    </div>
  );
};

export default AboutPageMain;
