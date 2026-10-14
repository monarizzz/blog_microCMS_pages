import { getClient } from "@/infra/microCMS/client";
import { MicroCMSQueries } from "microcms-js-sdk";
import { Profile } from "../schema/profile";

export const getProfile = async (
  queries?: MicroCMSQueries,
): Promise<Profile> => {
  return await getClient().getObject({
    endpoint: "profile",
    queries,
  });
};
