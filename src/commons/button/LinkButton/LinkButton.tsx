import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  label?: string;
};

const LinkButton = ({ href, label = "サイトへ" }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full border border-outline px-4 py-[10px]"
    >
      <ExternalLink size={15} className="text-on-surface" />
      <span className="text-[13px] font-medium text-on-surface">{label}</span>
    </Link>
  );
};

export default LinkButton;
