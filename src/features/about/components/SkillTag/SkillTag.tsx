import { NextPage } from "next";
import styles from "./SkillTag.module.css";

type Props = {
  skill: string;
};

const SkillTags: NextPage<Props> = ({ skill }) => {
  return <div className={styles.SkillTagsRoot}>{skill}</div>;
};

export default SkillTags;
