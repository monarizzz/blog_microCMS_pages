"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchIconButton from "@/commons/button/components/SearchIconButton/SearchIconButton";
import { cn } from "@/infra/Tailwind/cn";
import { pageList } from "../../constants/pageList";

type Props = {
  /** navigation ランドマークの名前。同一ページに複数並ぶため呼び出し側で出し分ける */
  label: string;
};

const GlobalNav = ({ label }: Props) => {
  const pathname = usePathname();

  // /tags は /tags/xxx のような下層でも現在ページ扱いにする。
  // startsWith だけだと /tagsfoo にも当たるため、区切り文字まで見る
  // usePathname は型上 string だが、ルーターが未確定の間は null が返る
  const isCurrent = (path: string) =>
    pathname === path || (pathname?.startsWith(`${path}/`) ?? false);

  return (
    <nav aria-label={label} className="flex items-center gap-md">
      {pageList.map((page) => {
        const current = isCurrent(page.path);

        return (
          <Link
            key={page.path}
            href={page.path}
            aria-current={current ? "page" : undefined}
            className={cn(
              "font-sans text-base text-secondary",
              current && "font-medium text-primary",
            )}
          >
            {page.label}
          </Link>
        );
      })}
      <SearchIconButton link="/search" />
    </nav>
  );
};

export default GlobalNav;
