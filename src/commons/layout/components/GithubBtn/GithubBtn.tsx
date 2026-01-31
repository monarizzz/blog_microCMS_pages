import Link from "next/link";
import Image from "next/image";
import { SVG_GITHUB } from "@/libs/utils/blog/github";
import styles from "./GithubBtn.module.scss";

const GithubBtn = () => {
  return (
    <div className={styles.GithubBtnRoot}>
      <Link href="https://github.com/monarizzz/blog_microCMS_pages">
        <Image
          src={SVG_GITHUB.SRC}
          alt={SVG_GITHUB.ALT}
          width={SVG_GITHUB.SIZE}
          height={SVG_GITHUB.SIZE}
          className={styles.icon}
        />
      </Link>
      <p className={styles.text}>{SVG_GITHUB.COMMENT}</p>
    </div>
  );
};

export default GithubBtn;
