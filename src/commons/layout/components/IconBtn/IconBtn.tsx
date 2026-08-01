import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const icons = {
  arrowUpRight: <ArrowUpRight size={15} className="text-on-surface-variant" />,
  link: <LinkIcon size={18} className="text-primary" />,
  x: <Image src="/x-mark.svg" alt="" width={16} height={16} aria-hidden />,
} as const;

export type IconName = keyof typeof icons;

type Props = {
  icon: IconName;
  link: string;
  label: string;
};

const IconBtn = ({ icon, link, label }: Props) => {
  return (
    <Link
      href={link}
      aria-label={label}
      className="border-outline bg-surface flex size-10.25 items-center justify-center rounded-full border"
    >
      {icons[icon]}
    </Link>
  );
};

export default IconBtn;
