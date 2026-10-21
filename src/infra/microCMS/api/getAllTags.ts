import { getClient } from "@/infra/microCMS/client";
import { MicroCMSQueries } from "microcms-js-sdk";
import { Tags } from "../schema/tags";

/**
 * tags を全件取得する。
 *
 * 一覧 API は limit 未指定だと 10 件で打ち切られるため、
 * SDK の getAllContents で totalCount まで取り切る。
 */
export const getAllTags = async (
  queries?: Omit<MicroCMSQueries, "limit" | "offset">,
) => {
  return await getClient().getAllContents<Tags>({
    endpoint: "tags",
    queries,
  });
};
