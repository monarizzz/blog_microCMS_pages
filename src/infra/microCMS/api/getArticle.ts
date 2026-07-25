import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

// TODO:APIに破壊的変更をする必要があるので最後に実装
export const getArticle = async ({
  q,
}: MicroCMSQueries): Promise<MicroCMSListResponse<Article>> => {
  return await client.getList({
    endpoint: "article",
  });
};
