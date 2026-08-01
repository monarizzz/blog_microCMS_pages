import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  tag?: {
    name: string;
    count: number;
  };
};

const SeeAllRight = ({ href, tag }: Props) => {
  return (
    <Link href={href} className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-primary text-[13px]">
          {tag ? `#${tag.name} の記事をすべて見る` : "すべての記事を見る"}
        </span>
        {tag && (
          <div className="bg-surface-container-low rounded-button px-2.25 py-0.75 text-sm tracking-[0.5px]">
            +{tag.count}
          </div>
        )}
      </div>
      <ArrowRight size={16} />
    </Link>
  );
};

export default SeeAllRight;
