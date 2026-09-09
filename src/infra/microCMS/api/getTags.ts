import { getClient } from "@/infra/microCMS/client";
import { Tags } from "../schema/tags";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

export const getTags = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Tags>> => {
  return await getClient().getList({
    endpoint: "tags",
    queries,
  });
};
