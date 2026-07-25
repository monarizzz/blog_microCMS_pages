import { MicroCMSImage } from "microcms-js-sdk";
import { Tags } from "./tags";

export type Experiences = {
  title: string;
  kind: string[];
  hasDetailPage: boolean;
  summary: string;
  description: string;
  heroImage: MicroCMSImage[];
  tags: Tags[];
  startDate: string;
  endDate?: string;
  periodLabel?: string;
  role?: string;
  url: [];
};
