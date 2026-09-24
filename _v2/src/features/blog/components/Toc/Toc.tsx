import Link from "next/link";
import { TocType } from "../../types/tocType";

type Props = {
  toc: TocType[];
};

const Toc = ({ toc }: Props) => {
  return (
    <div className="min-h-96 rounded-lg bg-slate-50 p-4 w-[20vw]">
      {toc.length != 0 ? (
        <ul className="ml-1">
          {toc.map((data) => (
            <li
              key={data.id}
              className="mb-0.5 text-xs leading-9 text-slate-500 hover:bg-gray-100 hover:text-slate-500 line-clamp-2 truncate break-words"
            >
              <Link href={`#${data.id}`}>{data.text}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Toc;
