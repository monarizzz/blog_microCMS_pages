import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  url: string;
  description?: string;
  thumbnailUrl?: string;
};

const Bookmark = ({ href, title, url, description, thumbnailUrl }: Props) => {
  return (
    <Link
      href={href}
      className="flex w-full items-center overflow-hidden rounded-lg border border-outline-variant"
    >
      <div className="flex w-full flex-col gap-1 p-4">
        <p className="w-full truncate text-md font-bold text-primary">
          {title}
        </p>
        {description && (
          <p className="w-full leading-normal text-on-surface-variant">
            {description}
          </p>
        )}
        <p className="text-sm text-secondary">{url}</p>
      </div>
      <div className="flex h-[104px] w-[140px] shrink-0 items-center justify-center bg-surface-container">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            width={140}
            height={104}
            className="h-full w-full object-cover"
          />
        ) : (
          <LinkIcon size={28} className="text-secondary" />
        )}
      </div>
    </Link>
  );
};

export default Bookmark;
