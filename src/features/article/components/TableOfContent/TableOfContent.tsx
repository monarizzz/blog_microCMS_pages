import { NextPage } from "next";
import Link from "next/link";
import { TocList } from "@/libs/schema/Blog/Toc";
import styles from "./TableOfContent.module.css";

type Props = {
  toc: TocList;
};

const TableOfContents: NextPage<Props> = ({ toc }) => {
  return (
    <>
      {toc.length != 0 ? (
        <div className={styles.TocGroup}>
          <p className={styles.TableOfContentsHead}>目次</p>
          <ul>
            {toc.map((data) => (
              <li key={data.id} className={styles.TableText}>
                <Link href={`#${data.id}`}>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default TableOfContents;
