import TagBtn from "@/commons/button/components/TagBtn/TagBtn";
import ShareBar from "@/commons/contentsDetail/components/ShareBar/ShareBar";
import ScrollTopButton from "@/commons/navigation/components/ScrollTopButton/ScrollTopButton";
import { siteUrl } from "@/commons/constants/site";

import type { ArticleBlock } from "../../types/articleBlock";
import type { PostNavigation } from "../../types/postNavigation";
import type { TocItem } from "../../types/tocItem";
import ArticleBody from "../ArticleBody/ArticleBody";
import ArticleToc from "../ArticleToc/ArticleToc";
import PostNav from "../PostNav/PostNav";

//TODO:仮置き。microCMS の articles から引くのは別フェーズ
const title = "Next.js 14 App Router 移行";
const tags = ["開発", "備忘録"];
const publishedAt = "2023.11.24";

//TODO:仮置き。タグ別一覧のルートが決まるまでタグ一覧へ逃がしている
const TAG_LINK = "/tags";

//TODO:仮置き
const blocks: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "Next.js 13から導入され、14でさらに洗練されたApp Router。Pages Routerからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、React Server Components (RSC) をデフォルトとする設計思想にあります。",
  },
  {
    type: "heading2",
    id: "server-components",
    text: "Server Componentsの基本原則",
  },
  {
    type: "paragraph",
    text: "Server Componentsはサーバー側でレンダリングされ、クライアントにはHTMLとシリアライズ可能なデータのみが送信されます。これにより、JavaScriptのバンドルサイズを大幅に削減できます。",
  },
  {
    type: "bulletList",
    items: [
      "データベースへの直接アクセスが可能",
      "機密情報（APIキーなど）を安全に扱える",
      "大きな依存関係をクライアントに送らずに済む",
    ],
  },
  {
    type: "heading2",
    id: "boundary",
    text: "境界（Boundary）の設計",
  },
  {
    type: "paragraph",
    text: "インタラクティブな要素（useState, onClickなど）が必要な場合のみ、ファイルの先頭で use client ディレクティブを宣言し、Client Componentとします。",
  },
  {
    type: "code",
    language: "tsx",
    code: `export default async function Page() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}`,
  },
  {
    type: "paragraph",
    text: "重要なのは、「ツリーの葉」に向かってのみClient Componentsを配置することです。Server ComponentsをClient Componentsの直接の子としてインポートすることはできませんが、children propとして渡すことは可能です。",
  },
  {
    type: "table",
    headers: ["プロパティ", "型", "説明"],
    rows: [
      ["title", "string", "記事のタイトル"],
      ["publishedAt", "string", "公開日時 (ISO 8601)"],
    ],
  },
  {
    type: "infoCard",
    text: "データフェッチは可能な限り親のServer Componentで行い、結果をpropsとしてClient Componentに渡す設計を心がけましょう。これにより不要なクライアントサイドのウォーターフォールリクエストを防ぐことができます。",
  },
  {
    type: "heading2",
    id: "summary",
    text: "まとめ",
  },
  {
    type: "paragraph",
    text: "App Routerへの移行は単なるディレクトリ構造の変更ではなく、コンポーネントの設計思想そのものの見直しを要求します。しかし、適切に境界を引くことで、パフォーマンスと開発体験の両方を大きく向上させることが可能です。",
  },
];

//TODO:仮置き。前後の記事は microCMS の一覧から引く
const postNavigation: PostNavigation = {
  prev: {
    id: "typescript-using",
    title: "TypeScript 5.2のusing宣言によるリソース管理",
  },
  next: { id: "tailwind-v4", title: "Tailwind CSS v4への期待と課題" },
};

/** 目次は本文の見出しから作る。データ接続後もこの導出は変わらない */
const toc: TocItem[] = blocks
  .filter(
    (block): block is Extract<ArticleBlock, { type: "heading2" }> =>
      block.type === "heading2",
  )
  .map(({ id, text }) => ({ id, text }));

type Props = {
  /** 共有 URL に使う記事の id */
  id: string;
};

const ArticleDetailMain = ({ id }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-310 gap-12 pt-43.75 pr-10 pb-24 pl-11.75">
      <div className="flex w-full min-w-0 flex-col gap-8">
        <article className="flex w-full flex-col gap-8">
          <header className="flex w-full flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagBtn key={tag} text={tag} link={TAG_LINK} />
              ))}
            </div>
            <h1 className="w-full text-3xl/tight font-bold tracking-tight text-primary">
              {title}
            </h1>
            <div className="flex w-full justify-end py-4">
              <span className="text-sm font-medium tracking-wider text-secondary">
                {publishedAt}
              </span>
            </div>
          </header>
          <ArticleBody blocks={blocks} />
        </article>
        <div className="flex w-full justify-end">
          <ScrollTopButton />
        </div>
        <div className="w-full">
          <ShareBar url={`${siteUrl}/article/${id}`} title={title} />
        </div>
        <PostNav prev={postNavigation.prev} next={postNavigation.next} />
      </div>
      <div className="w-60 shrink-0 pt-49.75">
        {/* 初期位置は pen (TocCol の上 padding 199) のまま、
            スクロール後は Header の下に貼り付けて読める位置に残す */}
        <div className="sticky top-44">
          <ArticleToc items={toc} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailMain;
