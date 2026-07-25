import Link from "next/link";
import { TocType } from "../../types/tocType";

type Props = {
  toc: TocType[];
};

const Toc = ({ toc }: Props) => {
  return (
    <div className="min-h-96 w-[20vw] rounded-lg bg-slate-50 p-4">
      {toc.length != 0 ? (
        <ul className="ml-1">
          {toc.map((data) => (
            <li
              key={data.id}
              className="mb-0.5 line-clamp-2 truncate text-ellipsis break-words text-xs leading-9 text-slate-500 hover:bg-gray-100 hover:text-slate-500"
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
