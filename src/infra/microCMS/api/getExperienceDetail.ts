import { getClient } from "@/infra/microCMS/client";
import { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";
import { Experiences } from "../schema/experiences";

export const getExperienceDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<Experiences & MicroCMSListContent> => {
  return await getClient().getListDetail<Experiences>({
    endpoint: "experiences",
    contentId,
    queries,
  });
};
