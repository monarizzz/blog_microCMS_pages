import { client } from "@/libs/microCMS/utils/client";
import {
  GetBlogListRequest,
  GetBlogListResponse,
} from "../../entities/contents/blog";

export const getCategoriesList = async ({ queries }: GetBlogListRequest) => {
  return await client.getList<GetBlogListResponse>({
    endpoint: "categories",
    queries,
  });
};
