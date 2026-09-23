import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import CategorySectionHeader from "@/commons/contents/components/CategorySectionHeader/CategorySectionHeader";
import FilterBtn from "@/commons/button/components/FilterBtn/FilterBtn";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/other/components/SeeAllRight/SeeAllRight";

//TODO:仮置き
// 記事は複数タグを持てるため、記事総数はカテゴリ別件数の合計とは一致しない。
// #282 のデータ接続時は記事一覧の総件数を独立して取得する
const totalCount = 38;
// フィルタは全カテゴリ。カテゴリ数はこの配列から数える
const categories = ["Next.js", "設計", "TypeScript", "テスト"];
// セクションとして展開するのは ui.pen の Sections に合わせて 3 件のみ。
// 各セクションに並べる記事も仮データ。件数 (count) はセクション全体の記事数で、
// articles はそのうち抜粋して表示する分なので一致しない
const sections = [
  {
    name: "Next.js",
    count: 12,
    articles: [
      {
        id: "nextjs-app-router",
        title: "Next.js 14 App Router 移行の勘所",
        summary:
          "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。",
        publishedAt: "2024-03-18",
        tags: ["Next.js", "設計"],
      },
      {
        id: "server-components-boundary",
        title: "Server Components の境界をどこに引くか",
        summary:
          "インタラクティブな要素が必要な箇所だけを Client Component に切り出すと、バンドルサイズと開発体験の両方を保てます。境界の引き方を整理します。",
        publishedAt: "2024-02-06",
        tags: ["Next.js", "設計"],
      },
      {
        id: "route-handlers",
        title: "Route Handlers でのキャッシュ制御",
        summary:
          "App Router の Route Handlers は既定でキャッシュされます。再検証のタイミングを明示しないと古い値が返り続けるため、指定方法をまとめました。",
        publishedAt: "2024-01-09",
        tags: ["Next.js"],
      },
    ],
  },
  {
    name: "設計",
    count: 11,
    articles: [
      {
        id: "feature-directory",
        title: "features ディレクトリの切り方",
        summary:
          "画面単位でも機能単位でもない中途半端な分割は、後から必ず破綻します。どこを境界にするかの判断基準を書き出しました。",
        publishedAt: "2024-03-02",
        tags: ["設計"],
      },
      {
        id: "design-tokens",
        title: "デザイントークンを実装に落とすまで",
        summary:
          "色・余白・タイポグラフィをトークンとして定義しても、実装側の命名が揃わなければ意味がありません。対応表を作るところから始めました。",
        publishedAt: "2024-02-18",
        tags: ["設計"],
      },
      {
        id: "tailwind-v4",
        title: "Tailwind CSS v4 への期待と課題",
        summary:
          "設定を CSS 側へ寄せる方針は歓迎ですが、@theme の自己参照など既存の書き方が通らない箇所もあります。移行時に踏んだ点を残します。",
        publishedAt: "2023-12-11",
        tags: ["設計"],
      },
    ],
  },
  {
    name: "TypeScript",
    count: 8,
    articles: [
      {
        id: "typescript-using",
        title: "TypeScript 5.2 の using 宣言によるリソース管理",
        summary:
          "Symbol.dispose に対応したオブジェクトをスコープの終わりで自動的に片付けられます。後始末の書き忘れを型の側から防げるようになりました。",
        publishedAt: "2024-01-22",
        tags: ["TypeScript"],
      },
      {
        id: "satisfies-operator",
        title: "satisfies で型の広がりを止める",
        summary:
          "型注釈を付けると値の情報が失われ、付けないと制約が効きません。satisfies はその両方を同時に満たすための演算子です。",
        publishedAt: "2023-11-05",
        tags: ["TypeScript", "設計"],
      },
    ],
  },
];

type Props = {
  activeTag?: string;
};

const TagsPageMain = ({ activeTag }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-16 pt-37.5 pr-10 pb-24 pl-11.75">
      <PageHeader
        title="Tags"
        count={`${totalCount} 記事 / ${categories.length} カテゴリ`}
      />
      <div className="flex items-center gap-2 border-b border-outline-variant pb-6">
        <FilterBtn
          text="すべて"
          link="/tags"
          size="md"
          solid
          active={!activeTag}
        />
        {categories.map((name) => (
          <FilterBtn
            key={name}
            text={`#${name}`}
            link={`/tags?tag=${encodeURIComponent(name)}`}
            size="md"
            solid
            active={activeTag === name}
          />
        ))}
      </div>
      <div className="flex flex-col gap-16">
        {sections.map((category) => (
          <section key={category.name} className="flex flex-col gap-2">
            <CategorySectionHeader
              name={category.name}
              count={`${category.count} 記事`}
            />
            <div className="flex w-full flex-col">
              {category.articles.map((article) => (
                <ContentsRow
                  key={article.id}
                  // セクション見出し (CategorySectionHeader) が h2 なので、
                  // その下に並ぶ記事タイトルは h3 にする
                  headingLevel={3}
                  title={article.title}
                  summary={article.summary}
                  publishedAt={article.publishedAt}
                  tags={article.tags}
                  href={`/article/${article.id}`}
                />
              ))}
            </div>
            <div className="flex justify-end pt-5 pb-1">
              <SeeAllRight
                href={`/article?tag=${encodeURIComponent(category.name)}`}
                tag={{
                  name: category.name,
                  count: Math.max(0, category.count - category.articles.length),
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TagsPageMain;
