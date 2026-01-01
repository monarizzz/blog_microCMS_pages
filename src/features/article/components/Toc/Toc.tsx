import { NextPage } from "next";
import Link from "next/link";
import { TocList } from "@/libs/schema/Blog/Toc";
import styles from "./Toc.module.scss";

type Props = {
  toc: TocList;
};

const Toc: NextPage<Props> = ({ toc }) => {
  const tree = "└─  ";
  return (
    <div className={styles.tocRoot}>
      {toc.length != 0 ? (
        <ul className={styles.list}>
          {toc.map((data) => (
            <li key={data.id} className={styles.text}>
              <p className={styles[data.styles]}>
                <Link href={`#${data.id}`}>
                  {data.styles == "h1" ? null : tree}
                  {data.text}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Toc;
