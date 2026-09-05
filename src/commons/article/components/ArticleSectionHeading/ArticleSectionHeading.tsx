import { Link as LinkIcon } from "lucide-react";

type Props = {
  title: string;
};

const ArticleSectionHeading = ({ title }: Props) => {
  return (
    <div className="flex w-full items-center gap-2 border-b border-outline-variant pb-2">
      <h2 className="w-full flex-1 text-xl font-bold tracking-[-0.2px] text-primary">
        {title}
      </h2>
      <LinkIcon size={18} className="shrink-0 text-secondary" />
    </div>
  );
};

export default ArticleSectionHeading;
