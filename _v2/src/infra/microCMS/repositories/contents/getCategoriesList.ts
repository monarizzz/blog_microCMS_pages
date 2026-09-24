import { client } from "@/libs/microCMS/client";
import {
  GetCategoryListRequest,
  GetCategoryListResponse,
} from "../../entities/contents/category";

export const getCategoriesList = async ({
  queries,
}: GetCategoryListRequest) => {
  return await client.getList<GetCategoryListResponse>({
    endpoint: "categories",
    queries,
  });
};
