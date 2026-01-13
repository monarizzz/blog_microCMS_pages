import { client } from "@/libs/microCMS/utils/client";
import {
  GetBlogListRequest,
  GetBlogListResponse,
} from "@/infra/microCMS/api/blog";

export const getBlogList = async ({ queries }: GetBlogListRequest) => {
  return await client.getList<GetBlogListResponse>({
    endpoint: "blog",
    queries,
  });
};
