import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { Profile } from "../schema/profile";

export const getProfile = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Profile>> => {
  return await client.getObject({
    endpoint: "profile",
    queries,
  });
};
