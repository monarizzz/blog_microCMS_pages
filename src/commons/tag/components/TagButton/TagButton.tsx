"use client";

import Link from "next/link";
import styles from "./TagButton.module.scss";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/contents/Category/category";
import truncateText from "@/features/blog/utils/limitText";
import { useSearchParams } from "next/navigation";

export type Props = {
  category: CategoryList;
  maxLength?: number;
};

const TagButton: NextPage<Props> = ({ category, maxLength }) => {
  const query = useSearchParams()?.get("id");
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) =>
        category.id !== query ? (
          <Link
            href={`/blog?id=${category.id}`}
            className={styles.linkTag}
            key={category.name}
          >
            # {truncateText(category.name, maxLength)}
          </Link>
        ) : (
          <span className={styles.tag} key={category.name}>
            # {truncateText(category.name, maxLength)}
          </span>
        ),
      )}
    </div>
  );
};

export default TagButton;
