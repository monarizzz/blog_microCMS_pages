import { Image as NoImgIcon } from "lucide-react";
import NextImage from "next/image";

type Props = {
  src?: string;
  alt?: string;
};

const ArticleThumbnail = ({ src, alt = "" }: Props) => {
  return (
    <div className="relative h-[180px] w-full overflow-hidden border border-outline-variant bg-surface-container-low">
      {src ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
          <NoImgIcon size={30} className="text-on-surface-variant" />
          <span className="font-mono text-2xs tracking-[2px] text-on-surface-variant">
            NO IMAGE
          </span>
        </div>
      )}
    </div>
  );
};

export default ArticleThumbnail;
