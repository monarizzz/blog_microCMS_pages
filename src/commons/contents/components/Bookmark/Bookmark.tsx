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
      className="flex w-full items-stretch overflow-hidden rounded-lg border border-outline-variant"
    >
      <div className="flex w-full flex-col gap-1 p-4">
        <p className="w-full text-md font-bold wrap-break-word text-primary">
          {title}
        </p>
        {description && (
          <p className="w-full leading-normal text-on-surface-variant">
            {description}
          </p>
        )}
        <p className="text-sm text-secondary">{url}</p>
      </div>
      <div className="flex min-h-26 w-35 shrink-0 items-center justify-center bg-surface-container">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt=""
            width={140}
            height={104}
            unoptimized
            className="size-full object-cover"
          />
        ) : (
          <LinkIcon size={28} className="text-secondary" />
        )}
      </div>
    </Link>
  );
};

export default Bookmark;
