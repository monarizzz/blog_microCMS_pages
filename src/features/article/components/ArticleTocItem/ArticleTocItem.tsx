import { cn } from "@/infra/Tailwind/cn";

type Props = {
  text: string;
  href: string;
  active?: boolean;
};

const ArticleTocItem = ({ text, href, active }: Props) => {
  return (
    <a href={href} className="flex w-full items-start gap-2.5">
      <span
        aria-hidden
        className={cn(
          "h-4.5 w-0.75 shrink-0 rounded-[2px]",
          active ? "bg-primary" : "bg-outline-variant",
        )}
      />
      <span
        className={cn(
          "w-full text-[13.5px] leading-[1.4]",
          active ? "font-medium text-primary" : "text-on-surface-variant",
        )}
      >
        {text}
      </span>
    </a>
  );
};

export default ArticleTocItem;
