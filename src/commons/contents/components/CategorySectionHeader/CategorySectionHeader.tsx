import { Link as LinkIcon } from "lucide-react";
import MetaText from "@/commons/other/components/MetaText/MetaText";

type Props = {
  name: string;
  count: string;
  anchor?: boolean;
};

// 見出しに振るフラグメント ID。カテゴリ名は日本語も来るが、空白だけは URL 断片で扱いづらいので詰める
export const categorySectionId = (name: string) =>
  `category-${name.trim().replace(/\s+/g, "-")}`;

const CategorySectionHeader = ({ name, count, anchor = true }: Props) => {
  const id = categorySectionId(name);

  return (
    <div className="flex w-full items-center justify-between gap-4 border-b-2 border-primary pb-4">
      <div className="flex items-center gap-2">
        <h2 id={id} className="text-lg font-bold tracking-snug text-primary">
          {`# ${name}`}
        </h2>
        {anchor && (
          <a
            href={`#${encodeURIComponent(id)}`}
            aria-label={`${name} セクションへのリンク`}
            className="text-secondary"
          >
            <LinkIcon size={18} aria-hidden />
          </a>
        )}
      </div>
      <MetaText>{count}</MetaText>
    </div>
  );
};

export default CategorySectionHeader;
