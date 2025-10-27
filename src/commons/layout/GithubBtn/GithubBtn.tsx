import Link from "next/link";
import Image from "next/image";
import { SVG_GITHUB } from "@/libs/utils/article/github";
import styles from "./GithubBtn.module.css";
import { NextPage } from "next";

type Props = {};

const GithubBtn: NextPage<Props> = ({}) => {
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
    </div>
  );
};

export default GithubBtn;
