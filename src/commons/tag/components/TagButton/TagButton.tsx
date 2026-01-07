import Link from "next/link";
import styles from "./TagButton.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/Category/category";
import truncateText from "@/libs/blog/limitText";

export type Props = {
  category: CategoryList;
  maxLength?: number;
};

const TagButton: NextPage<Props> = ({ category, maxLength }) => {
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) => (
        <Link
          href={`/article/recent/category?id=${category.id}`}
          className={styles.tag}
          key={category.name}
        >
          # {truncateText(category.name, maxLength)}
        </Link>
      ))}
    </div>
  );
};

export default TagButton;
