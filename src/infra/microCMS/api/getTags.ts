import { client } from "@/infra/microCMS/client";

export const getTags = async () => {
  return await client.getList({
    endpoint: "tags",
  });
};
