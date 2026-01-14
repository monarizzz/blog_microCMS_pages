import { NextPage } from "next";
import styles from "./SkillTag.module.css";

type Props = {
  skill: string;
};

const SkillTags: NextPage<Props> = ({ skill }) => {
  return <span className={styles.SkillTagsRoot}>{skill}</span>;
};

export default SkillTags;
