import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  tag?: {
    name: string;
    count: number;
  };
  /**
   * 文言を丸ごと差し替える。Home の Shelf は記事以外（制作物）も並ぶため、
   * 「すべての記事を見る」固定では合わない（pen `hdLAj` の SeeAll は
   * 「記事をすべて見る」「制作物をすべて見る」の 2 通り）。
   * `tag` を渡した場合はタグ用の文言が優先される
   */
  label?: string;
};

const SeeAllRight = ({ href, tag, label }: Props) => {
  return (
    <Link href={href} className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-primary">
          {tag
            ? `#${tag.name} の記事をすべて見る`
            : (label ?? "すべての記事を見る")}
        </span>
        {tag && tag.count > 0 && (
          <div className="rounded-button bg-surface-container-low px-2.25 py-0.75 text-sm tracking-[0.5px]">
            +{tag.count}
          </div>
        )}
      </div>
      <ArrowRight size={16} />
    </Link>
  );
};

export default SeeAllRight;
