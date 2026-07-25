import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { Article } from "../schema/article";

export const getArticle = async ({
  q,
}: MicroCMSQueries): Promise<MicroCMSListResponse<Article>> => {
  return await client.getList({
    endpoint: "article",
    queries: {},
  });
};
