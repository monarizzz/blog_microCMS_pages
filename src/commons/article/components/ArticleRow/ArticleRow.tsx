import TagBtn from "@/commons/layout/components/TagBtn/TagBtn";

const title = "Next.js 14 App Router 移行の勘所";
const expect =
  "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。";
const tagList = ["タグ", "Next.js"];

type Props = {
  compact?: boolean;
};

const ArticleRow = ({ compact }: Props) => {
  const tags = (
    <div className="flex gap-2">
      {tagList.map((tag) => (
        <TagBtn key={tag} text={tag} link={tag} />
      ))}
    </div>
  );

  return (
    <article className="flex w-full gap-8 border-b border-outline-variant py-6">
      <time
        dateTime="2024-03-18"
        className="my-auto text-sm tracking-[0.5px] text-secondary"
      >
        2024.03.18
      </time>
      {compact ? (
        <div className="flex w-full justify-between">
          <h2 className="text-[15.5px] font-bold tracking-[0.2px] text-primary">
            {title}
          </h2>
          <div className="flex gap-2">{tags}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-primary">{title}</h2>
          <p className="text-on-surface-variant">{expect}</p>
          <div className="flex gap-2">{tags}</div>
        </div>
      )}
    </article>
  );
};

export default ArticleRow;
