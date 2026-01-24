import Link from "next/link";
import styles from "./TagButton.module.scss";
import { NextPage } from "next";
import { CategoryList } from "@/libs/schema/contents/Category/category";
import { useRouter } from "next/router";
import truncateText from "@/features/blog/utils/limitText";

export type Props = {
  category: CategoryList;
  maxLength?: number;
};

const TagButton: NextPage<Props> = ({ category, maxLength }) => {
  const router = useRouter();
  const queryId = router.query["id"] ? String(router.query["id"]) : null;
  return (
    <div className={styles.tagButtonRoot}>
      {category.slice().map((category) =>
        category.id !== queryId ? (
          <Link
            href={`/blog/recent/category?id=${category.id}`}
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
