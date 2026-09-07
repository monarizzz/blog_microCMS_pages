import { ComponentProps } from "react";

import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/other/components/SeeAllRight/SeeAllRight";
import ShelfBook from "@/features/shelf/components/ShelfBook/ShelfBook";
import ShelfLabel from "@/features/shelf/components/ShelfLabel/ShelfLabel";
import ShelfNote from "@/features/shelf/components/ShelfNote/ShelfNote";
import ShelfPlank from "@/features/shelf/components/ShelfPlank/ShelfPlank";
import ShelfRow from "@/features/shelf/components/ShelfRow/ShelfRow";

/**
 * 棚に並ぶのは本（記事・制作物）とメモの 2 種類で、pen でも交互に差し込まれている。
 * 並び順ごと 1 つの配列で持ちたいので、判別可能なユニオンにした
 */
type ShelfItem =
  | ({ kind: "book" } & ComponentProps<typeof ShelfBook>)
  | ({ kind: "note" } & ComponentProps<typeof ShelfNote>);

//TODO:仮置き（データ接続は #282）
// 寸法・色・並び順は pen `hdLAj` の Row (p1b4u) をそのまま写している。
// pen では画像表紙の本が 2 冊あるが、表紙画像は microCMS 由来で
// データ接続まで用意できないため、短い表紙文字に置き換えた。
//
// href は付けていない。記事詳細 (`/article/[id]`) は本文がまだ
// プレースホルダで、遷移させても未実装画面に着地するため。
// 一覧への導線は下の SeeAllRight が持っている
const blogShelf: ShelfItem[] = [
  {
    kind: "book",
    title: "Next.js 14 App Router 移行の勘所",
    meta: "2024.03.18 · Blog",
    coverText: "Next",
    cover: "muted",
    coverHeight: "lg",
    accent: "muted",
    size: "lg",
  },
  {
    kind: "note",
    text: "わかりあえないを、\nわかる",
    label: "Attitude · 18",
  },
  {
    kind: "book",
    title: "型で守るコンポーネント設計",
    meta: "2024.02.06 · Blog",
    coverText: "TS",
    cover: "info",
    coverTextSize: "lg",
    coverHeight: "sm",
    size: "md",
  },
  {
    kind: "book",
    title: "余白のデザイン、その効能",
    meta: "2024.01.22 · Blog",
    coverText: "余白",
    cover: "muted",
    coverHeight: "lg",
    accent: "muted",
    size: "lg",
  },
  {
    kind: "book",
    title: "静的サイトという選択",
    meta: "2023.12.10 · Blog",
    coverText: "#",
    cover: "muted",
    coverTextSize: "lg",
    coverHeight: "md",
    accent: "success",
    size: "sm",
  },
  {
    kind: "book",
    title: "日本語タイポグラフィの基礎",
    meta: "2023.11.04 · Blog",
    coverText: "あ",
    coverTextSize: "lg",
    coverHeight: "lg",
    accent: "danger",
    size: "sm",
  },
];

//TODO:仮置き（データ接続は #282）
// 寸法・色・並び順は pen `hdLAj` の Row (VVE3R) をそのまま写している。
//
// href は付けていない。`/service/[id]` に実在する ID は `monelogue` だけで、
// ここに並ぶ 4 件はどれも notFound() に落ちるため
const serviceShelf: ShelfItem[] = [
  {
    kind: "note",
    text: "伝えるよりも、\n気づいてもらう",
    label: "Attitude · 10",
    size: "lg",
  },
  {
    kind: "book",
    title: "小杉湯",
    meta: "2024 | Service",
    coverText: "小杉湯",
    coverHeight: "lg",
    accent: "info",
    size: "lg",
  },
  {
    kind: "book",
    title: "麻婆食堂 DONDON",
    meta: "2024 | Service",
    coverText: "どんどん",
    cover: "dark",
    coverTextSize: "sm",
    coverHeight: "sm",
    accent: "danger",
    size: "sm",
  },
  {
    kind: "note",
    text: "意訳してみる",
    label: "Attitude · 15",
    size: "sm",
  },
  {
    kind: "book",
    title: "KISO",
    meta: "2024 | Service",
    coverText: "KISO",
    coverTextSize: "lg",
    coverHeight: "lg",
    size: "lg",
  },
  {
    kind: "book",
    title: "Portalley",
    meta: "2023 | Service",
    coverText: "Portalley",
    cover: "muted",
    coverTextSize: "sm",
    coverHeight: "md",
    accent: "warning",
    size: "sm",
  },
];

const renderShelfItems = (items: ShelfItem[]) =>
  items.map((item) =>
    item.kind === "book" ? (
      <ShelfBook key={item.title} {...item} />
    ) : (
      <ShelfNote key={item.label} {...item} />
    ),
  );

/**
 * Home ページ（`/`）の本体。pen の `Home Page — Shelf (案)`（frame `hdLAj`）に対応。
 *
 * Intro に続けて Blog / Service の本棚を 2 段並べ、各段のあとに
 * 一覧への導線（SeeAllRight）を置く。
 *
 * 他ページの *PageMain と違い、中央寄せの `max-w-275` コンテナは持たない。
 * 本棚が画面端まで伸びて横スクロールする構成で、pen 側も Shelf の Row と
 * ShelfLabel が左右 `$space-64` の padding を自分で持っているため
 */
const HomePageMain = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="px-16 pt-22 pb-10">
        <PageHeader kicker="Home" title="Portfolio" intro />
      </div>

      <section className="flex w-full flex-col">
        <ShelfLabel>Blog</ShelfLabel>
        <ShelfRow label="Blog の本棚">{renderShelfItems(blogShelf)}</ShelfRow>
        <ShelfPlank />
      </section>

      <div className="flex w-full justify-center pt-16.5 pb-22">
        <SeeAllRight href="/article" label="記事をすべて見る" />
      </div>

      <section className="flex w-full flex-col">
        <ShelfLabel>Service</ShelfLabel>
        <ShelfRow label="Service の本棚">
          {renderShelfItems(serviceShelf)}
        </ShelfRow>
        <ShelfPlank />
      </section>

      <div className="flex w-full justify-center pt-16 pb-22">
        <SeeAllRight href="/service" label="制作物をすべて見る" />
      </div>
    </div>
  );
};

export default HomePageMain;
