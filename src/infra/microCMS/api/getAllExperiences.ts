import { getClient } from "@/infra/microCMS/client";
import { MicroCMSQueries } from "microcms-js-sdk";
import { Experiences } from "../schema/experiences";

/**
 * experiences を全件取得する。
 *
 * 一覧 API は limit 未指定だと 10 件で打ち切られるため、
 * SDK の getAllContents で totalCount まで取り切る。
 */
export const getAllExperiences = async (
  queries?: Omit<MicroCMSQueries, "limit" | "offset">,
) => {
  return await getClient().getAllContents<Experiences>({
    endpoint: "experiences",
    queries,
  });
};
