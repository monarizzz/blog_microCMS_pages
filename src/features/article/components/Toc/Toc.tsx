import { NextPage } from "next";
import Link from "next/link";
import { TocList } from "@/features/article/types/toc";
import styles from "./Toc.module.scss";

type Props = {
  toc: TocList;
};

const Toc: NextPage<Props> = ({ toc }) => {
  return (
    <div className={styles.tocRoot}>
      {toc.length != 0 ? (
        <ul className={styles.list}>
          {toc.map((data) => (
            <li key={data.id} className={styles.text}>
              <Link href={`#${data.id}`}>{data.text}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Toc;
