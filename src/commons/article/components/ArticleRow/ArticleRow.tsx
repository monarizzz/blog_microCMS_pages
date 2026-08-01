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
        <TagBtn key={tag} text={tag} />
      ))}
    </div>
  );

  return (
    <div className="border-outline-variant flex w-full gap-8 border-b py-6">
      <p className="text-secondary my-auto text-sm tracking-[0.5px]">
        2024.03.18
      </p>
      {compact ? (
        <div className="flex w-full justify-between">
          <p className="text-primary text-[15.5px] font-bold tracking-[0.2px]">
            {title}
          </p>
          <div className="flex gap-2">{tags}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-primary font-bold">{title}</p>
          <p className="text-on-surface-variant">{expect}</p>
          <div className="flex gap-2">{tags}</div>
        </div>
      )}
    </div>
  );
};

export default ArticleRow;
