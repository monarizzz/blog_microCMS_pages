import type { MicroCMSListContent } from "microcms-js-sdk";

import type { Experiences } from "@/infra/microCMS/schema/experiences";

export type Service = Experiences;
/** 一覧取得で得られる 1 件。詳細ページのパスに id を使うため、カードはこちらを受け取る */
export type ServiceList = Service & MicroCMSListContent;

/** 1 行は 1 件または 2 件。3 件以上は表示できないため型で弾く */
export type ServiceRow =
  | readonly [ServiceList]
  | readonly [ServiceList, ServiceList];
