import Link from "next/link";
import styles from "./TagButton.module.css";
import { CategoryArray } from "@/infra/microCMS/schema/CategoryArray";
import { Category } from "@/infra/microCMS/schema/category";

export default function TagButton({ category }: CategoryArray) {
  return (
    <>
      {category.slice().map((category: Category) => (
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
}
