import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { siteUrl } from "@/commons/constants/site";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ServiceDetailMain from "@/features/service/components/ServiceDetailMain/ServiceDetailMain";
import { toServiceDetail } from "@/features/service/toServiceDetail";
import { getAllExperiences } from "@/infra/microCMS/api/getAllExperiences";
import { getExperienceDetail } from "@/infra/microCMS/api/getExperienceDetail";
import { isNotFoundError } from "@/infra/microCMS/isNotFoundError";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * 詳細ページを持つ実績を 1 件取得する。無ければ notFound() に倒す。
 *
 * microCMS に無い id に加えて、hasDetailPage が偽の実績も 404 にする。
 * 一覧カードがリンクしない実績の URL を直接開かれても、本文を用意していない
 * 空の詳細ページを出さないため（data-model.md の hasDetailPage の定義）。
 * 404 以外の失敗は握り潰さず error.tsx に任せる。障害をページ不在に見せないため。
 *
 * generateMetadata とページ本体で同じ id を引くので、cache で 1 リクエストにまとめる。
 */
const getService = cache(async (id: string) => {
  const experience = await getExperienceDetail(id).catch((error: unknown) => {
    if (isNotFoundError(error)) {
      notFound();
    }
    throw error;
  });

  if (!experience.hasDetailPage) {
    notFound();
  }

  return toServiceDetail(experience);
});

/**
 * ビルド時に生成する詳細ページの id を集める。
 *
 * 取得に失敗しても空配列を返す。ここで throw するとビルドが落ちるため、
 * 生成をリクエスト時へ委ねる（`dynamicParams` の既定は true）。
 */
export const generateStaticParams = async () => {
  try {
    const experiences = await getAllExperiences({
      fields: "id",
      filters: "hasDetailPage[equals]true",
    });
    return experiences.map(({ id }) => ({ id }));
  } catch {
    return [];
  }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const service = await getService(id);

  return buildPageMetadata({
    title: service.title,
    // ServiceDetail の description / overview はどちらも optional。
    // Hero のサマリー → 概要本文 → サービス名だけの定型文の順に落とす
    description:
      service.description ??
      service.overview ??
      `${service.title} の紹介ページです。`,
    path: `/service/${id}`,
  });
};

const ServiceDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const service = await getService(id);

  return (
    <LayoutMain>
      <ServiceDetailMain
        service={service}
        shareUrl={`${siteUrl}/service/${id}`}
      />
    </LayoutMain>
  );
};

export default ServiceDetailPage;
