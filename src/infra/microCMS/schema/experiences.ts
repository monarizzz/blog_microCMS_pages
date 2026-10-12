import { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type Experiences = {
  title: string;
  kind: string[];
  hasDetailPage: boolean;
  summary: string;
  description: string;
  // 任意の配列系フィールドは、未入力やフィールド追加前のコンテンツで
  // [] ではなく null やキー自体の欠落になりうるため、利用側で ?? [] に寄せる
  heroImage?: MicroCMSImage[] | null;
  tags?: (Tags & MicroCMSListContent)[] | null;
  startDate: string;
  endDate?: string;
  periodLabel?: string;
  role?: string;
  url?: CustomField[] | null;
};

type CustomField = {
  fieldId: "url";
  url: string;
};
