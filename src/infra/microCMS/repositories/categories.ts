import { client } from "@/libs/microCMS/utils/client";
import {
  GetBlogListRequest,
  GetBlogListResponse,
} from "@/infra/microCMS//api/categories";

export const getCategoriesList = async ({ queries }: GetBlogListRequest) => {
  return await client.getList<GetBlogListResponse>({
    endpoint: "categories",
    queries,
  });
};
