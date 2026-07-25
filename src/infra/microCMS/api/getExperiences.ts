import { client } from "@/infra/microCMS/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { Experiences } from "../schema/experiences";

export const getExperiences = async ({}): Promise<
  MicroCMSListResponse<Experiences>
> => {
  return await client.getList({
    endpoint: "experiences",
  });
};
