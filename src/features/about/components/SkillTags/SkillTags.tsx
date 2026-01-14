import { NextPage } from "next";
import styles from "./SkillTags.module.css";

type Props = {
  skill: string;
};

const SkillTags: NextPage<Props> = ({ skill }) => {
  return <div className={styles.SkillTagsRoot}>{skill}</div>;
};

export default SkillTags;
