import Image from "next/image";
import { ReactNode } from "react";

import LinkButton from "@/commons/button/components/LinkButton/LinkButton";
import ShareBar from "@/commons/contentsDetail/components/ShareBar/ShareBar";
import BackLink from "@/commons/other/components/BackLink/BackLink";
import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import InfoLabel from "@/commons/other/components/InfoLabel/InfoLabel";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import InfoRow from "@/commons/service/components/InfoRow/InfoRow";

/** LINKS の 1 行。microCMS の `Experiences.url`（繰り返しフィールド）1 要素に対応する */
export type ServiceDetailLink = {
  href: string;
  /** 省略時は LinkButton の既定ラベル（サイトへ / GitHub） */
  label?: string;
};

export type ServiceDetail = {
  title: string;
  /** Hero の Meta 行。「個人開発 · 2024 · フルスタック」の形 */
  meta?: string;
  description?: string;
  heroImageUrl?: string;
  //TODO:機能一覧に対応する microCMS のフィールドがまだ無い。
  // 接続フェーズで experiences 側にフィールドを足すまで空のまま呼べるよう任意にしている
  features?: string[];
  overview?: string;
  /** 1 要素 1 行で縦に並ぶ */
  techStack?: string[];
  /**
   * PERIOD の本体。microCMS の `startDate` / `endDate` から組み立てた期間表示。
   * 日付の整形は呼び出し側（データ取得層）の責務にしている
   */
  period?: string;
  /** `periodLabel` 相当の補足。「約2週間」「開発中」など。period の隣に括弧付きで添える */
  periodNote?: string;
  role?: string;
  /**
   * 外部リンク。CMS 側は件数が可変で GitHub を判別する区分も持たないため、
   * 配列で受け取りホスト名からアイコンを決める
   */
  links?: ServiceDetailLink[];
};

/** github.com 配下だけ GitHub アイコンにする。CMS にリンク種別の項目が無いための判定 */
const iconOf = (href: string) => {
  try {
    const { hostname } = new URL(href);

    return hostname === "github.com" || hostname.endsWith(".github.com")
      ? ("github" as const)
      : ("external-link" as const);
  } catch {
    // 相対パスなど URL として解釈できない値。アイコンは既定に倒す
    return "external-link" as const;
  }
};

type Props = {
  service: ServiceDetail;
  /** ShareBar が共有する詳細ページ自身の URL */
  shareUrl: string;
};

// pen 側は H2Wrap (HI8mb / E65HZo) という枠に下線と padding を持たせているが、
// 中身が見出し 1 つだけなので h2 自体に border-b / pb を当てて畳んだ
const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="w-full border-b border-outline-variant pb-2 text-[22px] font-bold tracking-snug text-primary">
    {children}
  </h2>
);

const ServiceDetailMain = ({ service, shareUrl }: Props) => {
  const {
    title,
    meta,
    description,
    heroImageUrl,
    features = [],
    overview,
    techStack = [],
    period,
    periodNote,
    role,
    links = [],
  } = service;

  const periodValue = [period, periodNote && `(${periodNote})`]
    .filter(Boolean)
    .join(" ");
  const hasInfo = Boolean(periodValue || role);

  return (
    <div className="mx-auto flex w-full max-w-257.5 flex-col gap-10 pt-37.5 pr-10 pb-24 pl-11.75">
      <BackLink text="Service へ戻る" link="/service" />
      <PageHeader hero title={title} meta={meta} sub={description} />
      {heroImageUrl ? (
        // 見出し (PageHeader の h1) に title があり画像は装飾なので alt は空。
        // sizes は本文コンテナ (max-w-257.5 = 1030px) から左右 padding を引いた概算
        <div className="relative h-90 w-full border border-outline-variant">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            sizes="(max-width: 1030px) 100vw, 950px"
            className="object-cover"
          />
        </div>
      ) : (
        // pen (yJKEY) はプレースホルダのラベルにプロダクト名の大文字を入れている
        <ImagePlaceholder className="h-90" label={title.toUpperCase()} />
      )}
      <div className="flex w-full gap-12">
        <div className="flex w-full flex-col gap-25">
          <div className="flex w-full flex-col gap-10">
            {features.length > 0 && (
              <section className="flex w-full flex-col gap-4">
                <SectionHeading>主な機能</SectionHeading>
                <ul className="flex w-full flex-col gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex w-full gap-2.5">
                      <span
                        aria-hidden
                        className="text-[16px] font-bold text-primary"
                      >
                        ・
                      </span>
                      <span className="w-full text-[15px] leading-[1.7] text-on-surface">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {overview && (
              <section className="flex w-full flex-col gap-4">
                <SectionHeading>概要</SectionHeading>
                <p className="w-full text-[16px] leading-[1.85] text-on-surface">
                  {overview}
                </p>
              </section>
            )}
          </div>
          <div className="flex w-full flex-col gap-2.5 pt-5">
            <ShareBar url={shareUrl} title={title} />
          </div>
        </div>
        <aside className="flex w-60 shrink-0 flex-col gap-7">
          {techStack.length > 0 && (
            <div className="flex w-full flex-col gap-2.5">
              <InfoLabel>TECH STACK</InfoLabel>
              <p className="w-full font-mono text-[12.5px] leading-[1.8] whitespace-pre-line text-on-surface">
                {techStack.join("\n")}
              </p>
            </div>
          )}
          {hasInfo && (
            <div className="flex w-full flex-col gap-4 border-t border-outline-variant pt-5">
              {periodValue && <InfoRow label="PERIOD" value={periodValue} />}
              {role && <InfoRow label="ROLE" value={role} />}
            </div>
          )}
          {links.length > 0 && (
            <div className="flex w-full flex-col gap-2.5 border-t border-outline-variant pt-5">
              <InfoLabel>LINKS</InfoLabel>
              {links.map(({ href, label }) => {
                const icon = iconOf(href);

                return (
                  <LinkButton
                    key={href}
                    href={href}
                    label={label ?? (icon === "github" ? "GitHub" : undefined)}
                    icon={icon}
                  />
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetailMain;
