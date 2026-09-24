import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/infra/Tailwind/cn";

type Props = {
  direction: "prev" | "next";
  title: string;
  href: string;
};

const LABEL = {
  prev: "Previous Post",
  next: "Next Post",
} as const;

const PostNavLink = ({ direction, title, href }: Props) => {
  const isNext = direction === "next";
  const Arrow = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={href}
      className={cn(
        "flex w-full flex-col gap-1 py-4",
        isNext ? "items-end pl-4" : "pr-4",
      )}
    >
      <span
        className={cn("flex items-center gap-1", isNext && "flex-row-reverse")}
      >
        <Arrow aria-hidden size={14} className="shrink-0 text-secondary" />
        <span className="text-sm font-medium tracking-wider text-secondary">
          {LABEL[direction]}
        </span>
      </span>
      <span
        className={cn("w-full text-md text-primary", isNext && "text-right")}
      >
        {title}
      </span>
    </Link>
  );
};

export default PostNavLink;
