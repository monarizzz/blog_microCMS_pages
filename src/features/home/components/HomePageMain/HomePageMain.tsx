import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/other/components/SeeAllRight/SeeAllRight";
import ShelfBook from "@/features/shelf/components/ShelfBook/ShelfBook";
import ShelfLabel from "@/features/shelf/components/ShelfLabel/ShelfLabel";
import ShelfNote from "@/features/shelf/components/ShelfNote/ShelfNote";
import ShelfPlank from "@/features/shelf/components/ShelfPlank/ShelfPlank";
import ShelfRow from "@/features/shelf/components/ShelfRow/ShelfRow";

import type { ShelfItem } from "../../types/shelfItem";

// 実データでは同名の記事・メモが並びうるため、key は並び順で取る。
// 並びはサーバーで決まり、クライアントで入れ替わることは無い
const renderShelfItems = (items: ShelfItem[]) =>
  items.map((item, index) =>
    item.kind === "book" ? (
      <ShelfBook key={`book-${index}`} {...item} />
    ) : (
      <ShelfNote key={`note-${index}`} {...item} />
    ),
  );

type ShelfSectionProps = {
  heading: string;
  items: ShelfItem[];
  seeAll: { href: string; label: string };
  /** pen では 2 段の SeeAllRight の上余白が 66 / 64 と割れているため、段ごとに渡す */
  seeAllClassName: string;
};

/**
 * 本棚 1 段と、そのあとの一覧への導線。
 *
 * 本が 1 冊も無ければ段ごと出さない。メモだけが載った棚や、
 * 何も載っていない棚板を見せても意味が無いため
 */
const ShelfSection = ({
  heading,
  items,
  seeAll,
  seeAllClassName,
}: ShelfSectionProps) => {
  if (!items.some((item) => item.kind === "book")) {
    return null;
  }

  return (
    <>
      <section className="flex w-full flex-col">
        <ShelfLabel>{heading}</ShelfLabel>
        <ShelfRow label={`${heading} の本棚`}>
          {renderShelfItems(items)}
        </ShelfRow>
        <ShelfPlank />
      </section>

      <div className={`flex w-full justify-center pb-22 ${seeAllClassName}`}>
        <SeeAllRight href={seeAll.href} label={seeAll.label} />
      </div>
    </>
  );
};

type Props = {
  /** 記事の棚。toArticleShelf で作る。本が無ければ段ごと出さない */
  blogShelf: ShelfItem[];
  /** 制作物の棚。toServiceShelf で作る。本が無ければ段ごと出さない */
  serviceShelf: ShelfItem[];
};

/**
 * Home ページ（`/`）の本体。pen の `Home Page — Shelf (案)`（frame `hdLAj`）に対応。
 *
 * Intro に続けて Blog / Service の本棚を 2 段並べ、各段のあとに
 * 一覧への導線（SeeAllRight）を置く。棚の並びは呼び出し側で
 * microCMS のデータから作って渡す（`toShelfItems.ts`）。
 *
 * 他ページの *PageMain と違い、中央寄せの `max-w-275` コンテナは持たない。
 * 本棚が画面端まで伸びて横スクロールする構成で、pen 側も Shelf の Row と
 * ShelfLabel が左右 `$space-64` の padding を自分で持っているため。
 *
 * ただし素の `px-16` だと、画面が本棚の中身より広いときに余りが全部
 * 右側の空白になり、左詰めに見える（#347）。そのため各ブロックの左右は
 * `content-gutter` で取り、他ページの `max-w-275` と左端を揃えている（#349）
 */
const HomePageMain = ({ blogShelf, serviceShelf }: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="content-gutter pt-22 pb-10">
        <PageHeader kicker="Home" title="Portfolio" intro />
      </div>

      <ShelfSection
        heading="Blog"
        items={blogShelf}
        seeAll={{ href: "/article", label: "記事をすべて見る" }}
        seeAllClassName="pt-16.5"
      />

      <ShelfSection
        heading="Service"
        items={serviceShelf}
        seeAll={{ href: "/service", label: "制作物をすべて見る" }}
        seeAllClassName="pt-16"
      />
    </div>
  );
};

export default HomePageMain;
