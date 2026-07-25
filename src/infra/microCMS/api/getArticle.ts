import { client } from "@/infra/microCMS/client";

export const getArticle = async () => {
  return await client.getList({
    endpoint: "article",
  });
};
