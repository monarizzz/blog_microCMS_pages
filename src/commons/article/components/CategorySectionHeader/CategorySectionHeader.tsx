import { Link as LinkIcon } from "lucide-react";
import MetaText from "@/commons/layout/components/MetaText/MetaText";

type Props = {
  name: string;
  count: string;
  anchor?: boolean;
};

const CategorySectionHeader = ({ name, count, anchor }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b-2 border-primary pb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold tracking-snug text-primary">
          {`# ${name}`}
        </h2>
        {anchor && <LinkIcon size={18} className="text-secondary" />}
      </div>
      <MetaText>{count}</MetaText>
    </div>
  );
};

export default CategorySectionHeader;
