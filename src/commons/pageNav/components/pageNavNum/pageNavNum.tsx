import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

const CELL_CLASS_NAME =
  "flex h-9 w-9 items-center justify-center rounded-full font-mono text-[12.5px] tracking-wider";
const ARROW_CLASS_NAME =
  "border-outline-variant flex h-9 w-9 items-center justify-center rounded-full border";

/** 先頭 3 ページ・現在ページ・最終ページを並べ、飛んだ箇所に省略記号を挟む（デザイン: 1 2 3 … 10） */
const buildPages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const numbers = [
    ...new Set(
      [1, 2, 3, currentPage, totalPages].filter(
        (n) => n >= 1 && n <= totalPages,
      ),
    ),
  ].sort((a, b) => a - b);

  return numbers.flatMap((page, index) =>
    index > 0 && page - numbers[index - 1] > 1
      ? (["ellipsis" as const, page] as const)
      : [page],
  );
};

const pageHref = (basePath: string, page: number) =>
  page === 1 ? basePath : `${basePath}?page=${page}`;

const PageNavNum = ({ currentPage, totalPages, basePath = "" }: Props) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="ページネーション" className="flex gap-4">
      {hasPrev ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          aria-label="前のページ"
          className={ARROW_CLASS_NAME}
        >
          <ChevronLeft size={16} className="text-primary" />
        </Link>
      ) : (
        <span aria-hidden className={ARROW_CLASS_NAME}>
          <ChevronLeft size={16} className="text-secondary" />
        </span>
      )}
      <div className="flex gap-1">
        {buildPages(currentPage, totalPages).map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="flex h-9 w-6 items-center justify-center font-mono text-[12.5px] text-secondary"
            >
              …
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className={`${CELL_CLASS_NAME} bg-primary text-on-primary`}
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={pageHref(basePath, page)}
              className={`${CELL_CLASS_NAME} bg-surface text-secondary`}
            >
              {page}
            </Link>
          ),
        )}
      </div>
      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          aria-label="次のページ"
          className={ARROW_CLASS_NAME}
        >
          <ChevronRight size={16} className="text-primary" />
        </Link>
      ) : (
        <span aria-hidden className={ARROW_CLASS_NAME}>
          <ChevronRight size={16} className="text-secondary" />
        </span>
      )}
    </nav>
  );
};

export default PageNavNum;
