import { getClient } from "@/infra/microCMS/client";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { Article } from "../schema/article";

export const getArticle = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Article>> => {
  return await getClient().getList({
    endpoint: "articles",
    queries,
  });
};
