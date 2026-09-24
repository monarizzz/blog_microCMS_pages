import { ReactNode } from "react";

import LinkButton from "@/commons/button/components/LinkButton/LinkButton";
import ShareBar from "@/commons/contentsDetail/components/ShareBar/ShareBar";
import BackLink from "@/commons/other/components/BackLink/BackLink";
import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import MetaText from "@/commons/other/components/MetaText/MetaText";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import InfoRow from "@/commons/service/components/InfoRow/InfoRow";

export type ServiceDetail = {
  title: string;
  /** Hero の Meta 行。「個人開発 · 2024 · フルスタック」の形 */
  meta?: string;
  description?: string;
  heroImageUrl?: string;
  features: string[];
  overview?: string;
  /** 1 要素 1 行で縦に並ぶ */
  techStack: string[];
  periodLabel?: string;
  role?: string;
  url?: string;
  githubUrl?: string;
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
    features,
    overview,
    techStack,
    periodLabel,
    role,
    url,
    githubUrl,
  } = service;

  const hasInfo = Boolean(periodLabel || role);
  const hasLink = Boolean(url || githubUrl);

  return (
    <div className="mx-auto flex w-full max-w-257.5 flex-col gap-10 pt-37.5 pr-10 pb-24 pl-11.75">
      <BackLink text="Service へ戻る" link="/service" />
      <PageHeader hero title={title} meta={meta} sub={description} />
      {heroImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImageUrl}
          alt={title}
          className="h-90 w-full border border-outline-variant object-cover"
        />
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
              <MetaText size="xs">TECH STACK</MetaText>
              <p className="w-full font-mono text-[12.5px] leading-[1.8] whitespace-pre-line text-on-surface">
                {techStack.join("\n")}
              </p>
            </div>
          )}
          {hasInfo && (
            <div className="flex w-full flex-col gap-4 border-t border-outline-variant pt-5">
              {periodLabel && <InfoRow label="PERIOD" value={periodLabel} />}
              {role && <InfoRow label="ROLE" value={role} />}
            </div>
          )}
          {hasLink && (
            <div className="flex w-full flex-col gap-2.5 border-t border-outline-variant pt-5">
              <MetaText size="xs">LINKS</MetaText>
              {githubUrl && (
                <LinkButton href={githubUrl} label="GitHub" icon="github" />
              )}
              {url && <LinkButton href={url} />}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetailMain;
