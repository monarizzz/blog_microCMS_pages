import Link from "next/link";
import styles from "./TagButton.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CategoryList } from "@/libs/schema/Category/category";

export type Props = {
  category: CategoryList;
};

const TagButton: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) => (
        <Link
          href={
            // TODO: マジックナンバー切り分け
            router.pathname === "/article/recent/tag"
              ? `/article/recent/tag/?id=${category.id}`
              : `/article/recent/tag`
          }
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
