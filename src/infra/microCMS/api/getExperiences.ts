import { client } from "@/infra/microCMS/client";

export const getExperiences = async () => {
  return await client.getList({
    endpoint: "experiences",
  });
};
