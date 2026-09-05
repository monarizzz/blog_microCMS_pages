import { ExternalLink, Image as ImageIcon } from "lucide-react";

export type ServiceCardProps = {
  title: string;
  techStack: string;
  developmentType?: string;
  thumbnailUrl?: string;
  url?: string;
  githubUrl?: string;
};

const ServiceCard = ({
  title,
  techStack,
  developmentType = "Solo development",
  thumbnailUrl,
  url,
  githubUrl,
}: ServiceCardProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-7 border border-outline-variant bg-surface">
      <div className="relative h-[180px] w-full overflow-hidden border-b border-outline-variant bg-surface-container-low">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-[10px]">
            <ImageIcon size={30} className="text-on-surface-variant" />
            <span className="font-mono text-2xs tracking-widest text-on-surface-variant">
              NO IMAGE
            </span>
          </div>
        )}
      </div>
      <div className="flex h-[149px] w-full flex-col gap-3 px-4">
        <div className="flex w-full items-center justify-between px-[3px]">
          <span className="text-center font-mono text-2xs text-secondary">
            {developmentType}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-3">
          <h3 className="text-center font-sans text-lg font-bold leading-[1.4] tracking-snug text-primary">
            {title}
          </h3>
          <div className="flex flex-col gap-3 px-[3px]">
            <p className="w-[230px] text-center font-mono text-[12px] text-secondary">
              {techStack}
            </p>
            <div className="flex w-[124px] items-center justify-center border-t border-outline-variant pt-1">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
