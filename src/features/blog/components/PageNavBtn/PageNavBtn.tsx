import Link from "next/link";
import Image from "next/image";
import { AdjacentBlog } from "../../types/blogNavigation";

type Props = {
  content: AdjacentBlog | null;
  isNext: boolean;
};

const PageNavBtn = ({ content, isNext }: Props) => {
  return content ? (
    <Link
      href={`/blog/${content.id}`}
      className={`flex min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-slate-300 p-4 hover:bg-gray-50 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      <Image
        src="/arrow.svg"
        alt=""
        width={7}
        height={7}
        style={{ transform: `scaleX(${isNext ? 1 : -1})` }}
      />
      <div className={`flex min-w-0 flex-col ${isNext ? "mr-3" : "ml-3"}`}>
        <span className="mb-1 break-words text-xs text-slate-500">
          {isNext ? "次の記事" : "前の記事"}
        </span>
        <span className="truncate font-bold">{content.title}</span>
      </div>
    </Link>
  ) : (
    <div className="flex-1" />
  );
};

export default PageNavBtn;
