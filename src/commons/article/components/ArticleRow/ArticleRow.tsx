import TagBtn from "@/commons/layout/components/TagBtn/TagBtn";

const title = "Next.js 14 App Router 移行の勘所";
const expect =
  "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。";
const tagNum = ["タグ", "Next.js"];

type Props = {
  compact?: boolean;
};

const ArticleRow = ({ compact }: Props) => {
  return (
    <div className="border-outline-variant flex w-full gap-8 border-b py-6">
      <p className="space-[0.5px] text-secondary my-auto text-sm">2024.03.18</p>
      {compact ? (
        <div className="flex w-full justify-between">
          <p className="text-primary space-[0.2px] text-[15.5px] font-bold">
            {title}
          </p>
          <div className="flex gap-2">
            {tagNum.map((tag) => (
              <TagBtn text={tag} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-primary font-bold">{title}</p>
          <p className="text-on-surface-variant">{expect}</p>
          <div className="flex gap-2">
            {tagNum.map((tag) => (
              <TagBtn text={tag} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleRow;
