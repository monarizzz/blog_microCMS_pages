import { NextPage } from "next";
import Link from "next/link";
import { TocList } from "@/libs/schema/Blog/Toc";
import styles from "./Toc.module.scss";

type Props = {
  toc: TocList;
};

const Toc: NextPage<Props> = ({ toc }) => {
  return (
    <div className={styles.TocRoot}>
      {toc.length != 0 ? (
        <div className={styles.group}>
          <p className={styles.header}>目次</p>
          <ul>
            {toc.map((data) => (
              <li key={data.id} className={styles.text}>
                <Link href={`#${data.id}`}>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Toc;
