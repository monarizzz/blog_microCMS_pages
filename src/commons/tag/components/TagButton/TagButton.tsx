import Link from "next/link";
import styles from "./TagButton.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";

export type Props = {
  category: CategoryList;
};

const TagButton: NextPage<Props> = ({ category }) => {
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) => (
        <Link
          href={`/article/recent/category?id=${category.id}`}
          className={styles.tag}
          key={category.name}
        >
          # {category.name}
        </Link>
      ))}
    </div>
  );
};

export default TagButton;
