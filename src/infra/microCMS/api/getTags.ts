import { getClient } from "@/infra/microCMS/client";
import { TagsContents } from "../schema/tags";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

export const getTags = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<TagsContents>> => {
  return await getClient().getList({
    endpoint: "tags",
    queries,
  });
};
