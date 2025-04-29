import { TocList } from "@/infra/Toc/TocList";
import { NextPage } from "next";
import style from "@/features/blog/article/components/TableOfContent/TableOfContent.module.css";
import Link from "next/link";

type Props = {
  toc: TocList;
};

const TableOfContents: NextPage<Props> = ({ toc }) => {
  return (
    <>
      {toc.length != 0 ? (
        <div className={style.TocGroup}>
          <p className={style.TableOfContentsHead}>目次</p>
          <ul>
            {toc.map((data) => (
              <li key={data.id} className={style.TableText}>
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
