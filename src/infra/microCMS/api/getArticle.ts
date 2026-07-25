import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse } from "microcms-js-sdk";

// TODO:APIに破壊的変更をする必要があるので最後に実装
export const getArticle = async (): Promise<MicroCMSListResponse<Article>> => {
  return await client.getList({
    endpoint: "article",
  });
};
