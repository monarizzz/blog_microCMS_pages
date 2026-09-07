import { client } from "@/infra/microCMS/client";
import { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";
import { Article } from "../schema/article";

export const getArticleDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<Article & MicroCMSListContent> => {
  return await client.getListDetail<Article>({
    endpoint: "article",
    contentId,
    queries,
  });
};
