import Link from "next/link";
import styles from "./TagButton.module.css";
import { CategoryArray } from "@/infra/microCMS/schema/categoryArray";
import { Category } from "@/infra/microCMS/schema/category";
import { NextPage } from "next";

export type Props = {
  category: any;
};

const TagButton: NextPage<Props> = ({ category }) => {
  return (
    <>
      {category.slice().map((category) => (
        <Link
          href={`./../article/recent/tag/?id=${category.id}`}
          className={styles.tag}
          key={category.name}
        >
          {category.name}
        </Link>
      ))}
    </>
  );
};

export default TagButton;
