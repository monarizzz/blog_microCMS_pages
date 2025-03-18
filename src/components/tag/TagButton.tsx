import Link from "next/link";
import styles from "./TagButton.module.css";

export default function TagButton({ category }) {
  return (
    <>
      {category
        .slice()
        .reverse()
        .map((category) => (
          <Link
            href={`../tag/tag/?id=${category.id}`}
            className={styles.tag}
            key={category.name}
          >
            {category.name}
          </Link>
        ))}
    </>
  );
}
