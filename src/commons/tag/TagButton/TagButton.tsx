import Link from "next/link";
import styles from "./TagButton.module.css";
import { CategoryId } from "@/infra/microCMS/schema/categoryId";
import { NextPage } from "next";

type Props = {
  category: CategoryId;
};

const TagButton: NextPage<Props> = ({ category }) => {
  return (
    <>
      {category.slice().map((category) => (
        <Link
          href={`./../tag/tag-page/?id=${category.id}`}
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
