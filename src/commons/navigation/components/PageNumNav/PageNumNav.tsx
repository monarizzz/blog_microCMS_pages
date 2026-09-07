import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  /**
   * ページ遷移時に引き継ぐクエリ（sort など）。undefined の値は付けない。
   * `page` はこのコンポーネントが組み立てるため、渡されても無視する
   */
  query?: Record<string, string | undefined>;
};

const CELL_CLASS_NAME =
  "flex h-9 w-9 items-center justify-center rounded-full font-mono text-[12.5px] tracking-wider";
const ARROW_CLASS_NAME =
  "border-outline-variant flex h-9 w-9 items-center justify-center rounded-full border";

/**
 * 先頭 3 ページ・現在ページとその前後 1 ページ・最終ページを並べ、
 * 飛んだ箇所に省略記号を挟む（1 ページ目は `1 2 3 … 10`、5 ページ目は `1 2 3 4 5 6 … 10`）。
 *
 * ui.pen の Pagination には 1 ページ目の状態しか描かれていないため、
 * 中間ページで前後 1 ページを出すのは実装側の判断（#285）
 */
const buildPages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const numbers = [
    ...new Set(
      [
        1,
        2,
        3,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        totalPages,
      ].filter((n) => n >= 1 && n <= totalPages),
    ),
  ].sort((a, b) => a - b);

  return numbers.flatMap((page, index) =>
    index > 0 && page - numbers[index - 1] > 1
      ? (["ellipsis" as const, page] as const)
      : [page],
  );
};

/**
 * 1 ページ目は page を付けない（正規 URL を 1 つに保つため）が、query は常に引き継ぐ。
 * query 側の page は捨てる。呼び出し側が現在の検索パラメータをそのまま渡した場合に、
 * 1 ページ目のリンクへ元の page が残るのを防ぐため
 */
const pageHref = (
  basePath: string,
  page: number,
  query: Record<string, string | undefined>,
) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (key !== "page" && value !== undefined) params.set(key, value);
  }
  if (page !== 1) params.set("page", String(page));

  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
};

const PageNavNum = ({
  currentPage,
  totalPages,
  basePath = "",
  query = {},
}: Props) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="ページネーション" className="flex gap-4">
      {hasPrev ? (
        <Link
          href={pageHref(basePath, currentPage - 1, query)}
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
              href={pageHref(basePath, page, query)}
              className={`${CELL_CLASS_NAME} bg-surface text-secondary`}
            >
              {page}
            </Link>
          ),
        )}
      </div>
      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1, query)}
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
