"use client";

import Link from "next/link";
import { Category } from "@/libs/schema/contents/Category/category";
import limitText from "@/features/blog/utils/limitText";
import { useSearchParams } from "next/navigation";

export type Props = {
  category: Category[];
  maxLength?: number;
};

const TagButton = ({ category, maxLength }: Props) => {
  const query = useSearchParams()?.get("cat");
  return (
    <div>
      {category.slice().map((category) =>
        category.id !== query ? (
          <Link
            href={`/blog?cat=${category.id}`}
            className="mx-0.5 rounded-3xl border border-slate-500 px-3 py-1.5 text-[0.625rem] font-bold tracking-widest text-slate-500 hover:bg-slate-500 hover:text-white"
            key={category.name}
          >
            # {limitText(category.name, maxLength)}
          </Link>
        ) : (
          // TODO:スタイルをまとめる
          <span
            className="m-0.5 rounded-3xl border border-slate-500 px-3 py-1.5 text-[0.625rem] font-bold tracking-widest text-slate-500"
            key={category.name}
          >
            # {limitText(category.name, maxLength)}
          </span>
        ),
      )}
    </div>
  );
};

export default TagButton;
