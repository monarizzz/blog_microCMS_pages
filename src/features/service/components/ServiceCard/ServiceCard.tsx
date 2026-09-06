import { ExternalLink, Image as ImageIcon } from "lucide-react";

export type ServiceCardProps = {
  title: string;
  techStack: string;
  developmentType: string;
  /** サムネイル画像の URL。未指定時は NO IMAGE のフォールバックを表示する */
  thumbnailUrl?: string;
  url?: string;
  githubUrl?: string;
};

const ServiceCard = ({
  title,
  techStack,
  developmentType,
  thumbnailUrl,
  url,
  githubUrl,
}: ServiceCardProps) => {
  const hasLink = Boolean(url || githubUrl);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-7 border border-outline-variant bg-surface">
      <div className="relative h-45 w-full overflow-hidden border-b border-outline-variant bg-surface-container-low">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2.5">
            <ImageIcon size={30} className="text-on-surface-variant" />
            <span className="font-mono text-2xs tracking-[2px] text-on-surface-variant">
              NO IMAGE
            </span>
          </div>
        )}
      </div>
      <div className="flex min-h-37.25 w-full flex-col gap-3 px-4 pb-4">
        <div className="flex w-full items-center justify-between px-0.75">
          <span className="text-center font-mono text-2xs text-secondary">
            {developmentType}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-3">
          {/* 使用箇所は Service 一覧（h1 "Service" の直下）だけなので h2。
              h3 だと h1 から 1 段飛んで heading-order (axe) 違反になる。
              他の階層でも使うようになったら headingLevel prop を検討する */}
          <h2 className="text-center font-sans text-lg leading-[1.4] font-bold tracking-snug text-primary">
            {title}
          </h2>
          <div className="flex flex-col gap-3 px-0.75">
            <p className="w-full text-center font-mono text-[12px] wrap-break-word text-secondary">
              {techStack}
            </p>
            {hasLink && (
              <div className="flex w-31 items-center justify-center border border-outline-variant pt-1">
                <div className="flex items-center gap-4">
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="font-sans text-[12.5px] font-medium text-primary">
                        URL
                      </span>
                      <ExternalLink size={13} className="text-secondary" />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="font-sans text-[12.5px] font-medium text-primary">
                        GitHub
                      </span>
                      <ExternalLink size={13} className="text-secondary" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
