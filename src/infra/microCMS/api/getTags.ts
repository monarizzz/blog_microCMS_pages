import { client } from "@/infra/microCMS/client";
import { Tags } from "../schema/tags";
import { MicroCMSListResponse } from "microcms-js-sdk";

export const getTags = async ({
  q,
}: MicroCMSQueries): Promise<MicroCMSListResponse<Tags>> => {
  return await client.getList({
    endpoint: "tags",
  });
};
