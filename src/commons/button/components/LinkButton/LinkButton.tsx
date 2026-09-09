import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const ICONS = {
  "external-link": ExternalLink,
  github: Github,
} as const;

type Props = {
  href: string;
  label?: string;
  /** 先頭アイコン。pen 側の LinkIcon (l4kdx) の override に対応する */
  icon?: keyof typeof ICONS;
};

const LinkButton = ({
  href,
  label = "サイトへ",
  icon = "external-link",
}: Props) => {
  const Icon = ICONS[icon];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full border border-outline px-4 py-2.5"
    >
      <Icon size={15} className="text-on-surface" />
      <span className="text-[13px] font-medium text-on-surface">{label}</span>
    </Link>
  );
};

export default LinkButton;
