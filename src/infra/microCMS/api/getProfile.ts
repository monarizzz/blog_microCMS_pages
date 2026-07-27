import { client } from "@/infra/microCMS/client";
import { MicroCMSDate, MicroCMSQueries } from "microcms-js-sdk";
import { Profile } from "../schema/profile";

export const getProfile = async (
  queries?: MicroCMSQueries,
): Promise<Profile & MicroCMSDate> => {
  return await client.getObject({
    endpoint: "profile",
    queries,
  });
};
