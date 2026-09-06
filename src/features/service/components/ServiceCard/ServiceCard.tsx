import { ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  role: string;
  stack: string;
  url?: string;
  github?: string;
};

const ServiceCard = ({ title, role, stack, url, github }: Props) => {
  return (
    <div className="flex h-[362px] w-full flex-col items-center gap-7 border border-outline-variant bg-surface">
      <div className="flex h-[180px] w-full flex-col items-center justify-center gap-2.5 border border-outline-variant bg-surface-container-low">
        <ImageIcon size={30} className="text-on-surface-variant" />
        <span className="font-mono text-2xs tracking-[2px] text-on-surface-variant">
          NO IMAGE
        </span>
      </div>
      <div className="flex h-[149px] w-full flex-col gap-3 px-4">
        <div className="flex items-center justify-between px-[3px]">
          <span className="w-full text-center font-mono text-2xs text-secondary">
            {role}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-3">
          <h3 className="text-center text-lg leading-[1.4] font-bold tracking-snug text-primary">
            {title}
          </h3>
          <div className="flex flex-col gap-3 px-[3px]">
            <p className="w-[230px] self-center text-center font-mono text-[12px] text-secondary">
              {stack}
            </p>
            <div className="flex w-[124px] items-center justify-center gap-4 self-center border border-outline-variant pt-1">
              {url && (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span className="text-[12.5px] font-medium text-primary">
                    URL
                  </span>
                  <ExternalLink size={13} className="text-secondary" />
                </Link>
              )}
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span className="text-[12.5px] font-medium text-primary">
                    GitHub
                  </span>
                  <ExternalLink size={13} className="text-secondary" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
