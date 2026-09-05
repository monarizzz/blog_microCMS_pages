import { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type Experiences = {
  title: string;
  kind: string[];
  hasDetailPage: boolean;
  summary: string;
  description: string;
  heroImage: MicroCMSImage[];
  tags: (Tags & MicroCMSListContent)[];
  startDate: string;
  endDate?: string;
  periodLabel?: string;
  role?: string;
  url: CustomField[];
};

type CustomField = {
  fieldId: "url";
  url: string;
};
