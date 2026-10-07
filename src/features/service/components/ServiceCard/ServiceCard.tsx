import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";

import type { ServiceList } from "../../types/ServiceCard";

type Props = {
  service: ServiceList;
};

/**
 * microCMS の url フィールドは種別を持たないため、ホストで GitHub かどうかを判別する。
 * URL として解釈できない値は通常のリンク扱いにする
 */
const linkLabel = (href: string) => {
  try {
    return new URL(href).hostname === "github.com" ? "GitHub" : "URL";
  } catch {
    return "URL";
  }
};

const ServiceCard = ({ service }: Props) => {
  const { id, title, kind, hasDetailPage, heroImage, tags, url } = service;
  /* サムネイルは1枚目を使用 */
  const thumbnail = heroImage?.[0];
  const links = (url ?? []).filter((link) => link.url);
  /* 実績カードには技術系のタグだけを出す（トピックは記事用の分類）*/
  const techStack = (tags ?? [])
    .filter((tag) => !tag.type.includes("トピック"))
    .map((tag) => tag.name)
    .join(" / ");
  const detailPath = hasDetailPage ? `/service/${id}` : undefined;

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-7 border border-outline-variant bg-surface">
      <div className="relative h-45 w-full overflow-hidden border-b border-outline-variant bg-surface-container-low">
        {thumbnail ? (
          // カード見出し (h2) に title があり、サムネイル自体は装飾なので alt は空。
          // sizes は 1 行 2 カラム (max-w-275 = 1100px 内) のカード幅に合わせた概算。
          // next/image で最適化するため、next.config.ts の images.remotePatterns に
          // 登録されたホスト (microCMS) か、public 配下のパスのみ渡せる
          <Image
            src={thumbnail.url}
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
            {kind.join(" / ")}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-3">
          {/* 使用箇所は Service 一覧（h1 "Service" の直下）だけなので h2。
              h3 だと h1 から 1 段飛んで heading-order (axe) 違反になる。
              他の階層でも使うようになったら headingLevel prop を検討する */}
          <h2 className="px-0.75 font-sans text-lg leading-[1.4] font-bold tracking-snug text-primary">
            {/* pen (jhtzh) に詳細ページへの導線は無いため、見た目を足さずに
                タイトル自体をリンクにする。hasDetailPage が false なら素のテキスト */}
            {detailPath ? <Link href={detailPath}>{title}</Link> : title}
          </h2>
          <div className="flex flex-col gap-3 px-0.75">
            <p className="w-full font-mono text-[12px] wrap-break-word text-secondary">
              {techStack}
            </p>
            {links.length > 0 && (
              <div className="flex w-31 items-center justify-center pt-1">
                <div className="flex items-center gap-4">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="font-sans text-[12.5px] font-medium text-primary">
                        {linkLabel(link.url)}
                      </span>
                      <ExternalLink size={13} className="text-secondary" />
                    </a>
                  ))}
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
