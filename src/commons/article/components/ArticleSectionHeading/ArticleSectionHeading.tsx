import { Link as LinkIcon } from "lucide-react";

type Variant = "article" | "timeline";

type Props = {
  title: string;
  showLinkIcon?: boolean;
  variant?: Variant;
};

const VARIANT_CLASS_NAME: Record<
  Variant,
  { wrapper: string; heading: string }
> = {
  article: { wrapper: "pb-2", heading: "text-xl" },
  timeline: { wrapper: "pb-4", heading: "text-2xl" },
};

const ArticleSectionHeading = ({
  title,
  showLinkIcon = true,
  variant = "article",
}: Props) => {
  const { wrapper, heading } = VARIANT_CLASS_NAME[variant];

  return (
    <div
      className={`flex w-full items-center gap-2 border-b border-outline-variant ${wrapper}`}
    >
      <h2
        className={`w-full flex-1 font-bold leading-tight tracking-[-0.2px] text-primary ${heading}`}
      >
        {title}
      </h2>
      {showLinkIcon && (
        <LinkIcon size={18} className="shrink-0 text-secondary" />
      )}
    </div>
  );
};

export default ArticleSectionHeading;
