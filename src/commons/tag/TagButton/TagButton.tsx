import Link from "next/link";
import styles from "./TagButton.module.css";
import { NextPage } from "next";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { useRouter } from "next/router";

export type Props = {
  category: CategoryList;
};

const TagButton: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  return (
    <>
      {category.slice().map((category) => (
        <Link
          href={
            router.pathname === "/article/recent/tag"
              ? `/article/recent/tag/?id=${category.id}`
              : `/article/recent/tag`
          }
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
