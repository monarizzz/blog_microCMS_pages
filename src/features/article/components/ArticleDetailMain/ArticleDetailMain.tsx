import TagBtn from "@/commons/button/components/TagBtn/TagBtn";
import ShareBar from "@/commons/contentsDetail/components/ShareBar/ShareBar";
import ScrollTopButton from "@/commons/navigation/components/ScrollTopButton/ScrollTopButton";

import type { ArticleBlock } from "../../types/articleBlock";
import type { ArticleDetail } from "../../types/articleDetail";
import type { PostNavigation } from "../../types/postNavigation";
import type { TocItem } from "../../types/tocItem";
import ArticleBody from "../ArticleBody/ArticleBody";
import ArticleToc from "../ArticleToc/ArticleToc";
import PostNav from "../PostNav/PostNav";

/** タグ別の記事一覧。Tags ページの「すべて見る」と同じく /article の ?tag= へ送る */
const tagHref = (tag: string) => `/article?tag=${encodeURIComponent(tag)}`;

/**
 * 目次は本文の節の見出し (heading2) から作る。
 * pen の TocItem (FdgCE) は字下げの無い 1 段だけなので、小見出し (heading3) は載せない
 */
const toToc = (blocks: ArticleBlock[]): TocItem[] =>
  blocks
    .filter(
      (block): block is Extract<ArticleBlock, { type: "heading2" }> =>
        block.type === "heading2",
    )
    .map(({ id, text }) => ({ id, text }));

type Props = {
  article: ArticleDetail;
  postNavigation: PostNavigation;
  /** ShareBar で共有する記事の URL */
  shareUrl: string;
};

const ArticleDetailMain = ({ article, postNavigation, shareUrl }: Props) => {
  const { title, tags, publishedAt, publishedDate, blocks } = article;

  return (
    <div className="mx-auto flex w-full max-w-310 gap-12 pt-43.75 pr-10 pb-24 pl-11.75">
      <div className="flex w-full min-w-0 flex-col gap-8">
        <article className="flex w-full flex-col gap-8">
          <header className="flex w-full flex-col gap-6">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBtn key={tag} text={tag} link={tagHref(tag)} />
                ))}
              </div>
            )}
            <h1 className="w-full text-3xl/tight font-bold tracking-tight text-primary">
              {title}
            </h1>
            <div className="flex w-full justify-end py-4">
              <time
                dateTime={publishedAt}
                className="text-sm font-medium tracking-wider text-secondary"
              >
                {publishedDate}
              </time>
            </div>
          </header>
          <ArticleBody blocks={blocks} />
        </article>
        <div className="flex w-full justify-end">
          <ScrollTopButton />
        </div>
        <div className="w-full">
          <ShareBar url={shareUrl} title={title} />
        </div>
        <PostNav prev={postNavigation.prev} next={postNavigation.next} />
      </div>
      <div className="w-60 shrink-0 pt-49.75">
        {/* 初期位置は pen (TocCol の上 padding 199) のまま、
            スクロール後は Header の下に貼り付けて読める位置に残す */}
        <div className="sticky top-44">
          <ArticleToc items={toToc(blocks)} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailMain;
