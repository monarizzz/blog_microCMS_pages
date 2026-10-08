import Link from "next/link";

import TagBtn from "@/commons/button/components/TagBtn/TagBtn";

/** タグ絞り込み一覧への遷移先。既存の TagsPageMain のフィルタと同じ形式に揃える */
const tagHref = (tag: string) => `/tags?tag=${encodeURIComponent(tag)}`;

/**
 * ISO 8601 の日付を表示用の `2024.03.18` 形式にする。
 * `Date` を通すとタイムゾーンで 1 日ずれるため、日付部分を文字列として置換するだけに留める
 */
const formatPublishedAt = (publishedAt: string) =>
  publishedAt.slice(0, 10).replace(/-/g, ".");

type Props = {
  title: string;
  /** ISO 8601 の日時文字列。`<time dateTime>` には日付部分をそのまま入れる */
  publishedAt: string;
  /** 記事詳細への遷移先 */
  href: string;
  /** 本文の抜粋。`compact` では表示しないため任意 */
  summary?: string;
  /** タグを持たない記事もあるため任意 */
  tags?: string[];
  compact?: boolean;
  /**
   * 記事タイトルの見出しレベル。
   * `h1` 直下に並ぶ記事一覧・検索結果は 2、セクション見出し (`h2`) の下に置く
   * Tags ページのように 1 段深い場所では 3 を指定する
   */
  headingLevel?: 2 | 3;
};

const ContentsRow = ({
  title,
  publishedAt,
  href,
  summary,
  tags = [],
  compact,
  headingLevel = 2,
}: Props) => {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  // タグも記事詳細もリンクなので、行全体を <a> で包むと a の入れ子になる。
  // タイトルのリンクを疑似要素で行全体に広げ、タグだけその上に載せる
  const titleLink = (
    <Link href={href} className="after:absolute after:inset-0">
      {title}
    </Link>
  );

  const tagList = (
    <div className="relative flex gap-2">
      {tags.map((tag) => (
        <TagBtn key={tag} text={tag} link={tagHref(tag)} />
      ))}
    </div>
  );

  return (
    <article className="relative flex w-full gap-8 border-b border-outline-variant py-6">
      <time
        dateTime={publishedAt.slice(0, 10)}
        className="my-auto text-sm tracking-[0.5px] text-secondary"
      >
        {formatPublishedAt(publishedAt)}
      </time>
      {compact ? (
        <div className="flex w-full justify-between">
          <Heading className="text-[15.5px] font-bold tracking-[0.2px] text-primary">
            {titleLink}
          </Heading>
          {tagList}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Heading className="font-bold text-primary">{titleLink}</Heading>
          <p className="text-on-surface-variant">{summary}</p>
          {tagList}
        </div>
      )}
    </article>
  );
};

export default ContentsRow;
