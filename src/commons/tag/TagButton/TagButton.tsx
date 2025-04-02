import Link from "next/link";
import styles from "./TagButton.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

export type Props = {
  category: CategoryList;
};

const TagButton: NextPage<Props> = ({ category }) => {
  return (
    <>
      {category.slice().map((category) => (
        <Link
          href={`/article/recent/tag/?id=${category.id}`}
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
