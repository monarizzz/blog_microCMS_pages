import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { Profile } from "../schema/profile";

export const getProfile = async (): Promise<MicroCMSListResponse<Profile>> => {
  return await client.getList({
    endpoint: "profile",
  });
};
