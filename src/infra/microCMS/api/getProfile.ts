import { client } from "@/infra/microCMS/client";

export const getProfile = async () => {
  return await client.getList({
    endpoint: "profile",
  });
};
