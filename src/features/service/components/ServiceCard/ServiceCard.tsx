import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import { cn } from "@/infra/Tailwind/cn";

export type ServiceCardProps = {
  title: string;
  techStack: string;
  developmentType: string;
  /**
   * サムネイル画像の URL。未指定時は NO IMAGE のフォールバックを表示する。
   * next/image で最適化するため、`next.config.ts` の images.remotePatterns に
   * 登録されたホスト (microCMS) か、public 配下のパスのみ渡せる
   */
  thumbnailUrl?: string;
  url?: string;
  githubUrl?: string;
  /**
   * 詳細ページのパス。microCMS の `hasDetailPage` が false の項目は
   * 詳細ページを持たないので、その場合は渡さない（外部リンクのみになる）
   */
  detailPath?: string;
};

const ServiceCard = ({
  title,
  techStack,
  developmentType,
  thumbnailUrl,
  url,
  githubUrl,
  detailPath,
}: ServiceCardProps) => {
  const hasLink = Boolean(url || githubUrl);

  return (
    // detailPath がある場合のみカード全体をリンク領域として扱う。
    // relative は Link の ::after (after:inset-0) の基準、group は
    // カードのどこをホバーしてもタイトルに下線を出すために付ける
    <div
      className={cn(
        "flex w-full flex-1 flex-col items-center gap-7 border border-outline-variant bg-surface",
        detailPath && "group relative transition-colors hover:border-outline",
      )}
    >
      <div className="relative h-45 w-full overflow-hidden border-b border-outline-variant bg-surface-container-low">
        {thumbnailUrl ? (
          // カード見出し (h2) に title があり、サムネイル自体は装飾なので alt は空。
          // sizes は 1 行 2 カラム (max-w-275 = 1100px 内) のカード幅に合わせた概算。
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            sizes="(max-width: 1100px) 50vw, 520px"
            className="object-cover"
          />
        ) : (
          // 枠と高さは親の div が持つため、ImagePlaceholder 既定の
          // h-55 / border を打ち消して親いっぱいに広げる
          <ImagePlaceholder className="size-full border-0" />
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
          <h2 className="px-0.75 font-sans text-lg leading-[1.4] font-bold tracking-snug text-primary">
            {/* ::after でカード全面をクリック領域にする。カード全体を <a> で
                包むと下の外部リンクが入れ子の <a> になり不正な HTML になるため。
                フォーカスリングもこの ::after に出すことで、リンク自体は
                文字幅しか無くてもカード外周にリングが出る。
                detailPath 未指定なら素のテキスト */}
            {detailPath ? (
              <Link
                href={detailPath}
                className="group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <div className="flex flex-col gap-3 px-0.75">
            <p className="w-full font-mono text-[12px] wrap-break-word text-secondary">
              {techStack}
            </p>
            {hasLink && (
              // カード全面に広がる Link の ::after より手前に出さないと
              // 外部リンクがクリックできなくなるため relative z-10 で退避させる
              <div className="relative z-10 flex w-31 items-center justify-center border border-outline-variant pt-1">
                <div className="flex items-center gap-4">
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                      className="flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
