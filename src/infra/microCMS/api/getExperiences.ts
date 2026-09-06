import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { Experiences } from "../schema/experiences";

export const getExperiences = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Experiences>> => {
  return await client.getList({
    endpoint: "experiences",
    queries,
  });
};
