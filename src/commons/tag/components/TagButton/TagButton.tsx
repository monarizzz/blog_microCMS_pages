"use client";

import Link from "next/link";
import styles from "./TagButton.module.scss";
import { CategoryList } from "@/libs/schema/contents/Category/category";
import limitText from "@/features/blog/utils/limitText";
import { useSearchParams } from "next/navigation";

export type Props = {
  category: CategoryList;
  maxLength?: number;
};

const TagButton = ({ category, maxLength }: Props) => {
  const query = useSearchParams()?.get("cat");
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) =>
        category.id !== query ? (
          <Link
            href={`/blog?cat=${category.id}`}
            className={styles.linkTag}
            key={category.name}
          >
            # {limitText(category.name, maxLength)}
          </Link>
        ) : (
          <span className={styles.tag} key={category.name}>
            # {limitText(category.name, maxLength)}
          </span>
        ),
      )}
    </div>
  );
};

export default TagButton;
