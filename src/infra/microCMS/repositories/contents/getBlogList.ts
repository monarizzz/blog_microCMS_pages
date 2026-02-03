import { client } from "@/libs/microCMS/utils/client";
import {
  GetBlogListRequest,
  GetBlogListResponse,
} from "../../entities/contents/blog";

export const getBlogList = async ({ queries }: GetBlogListRequest) => {
  const filters = `development_env[contains]${process.env.DEPLOYMENT_ENVIRONMENTS}`;

  return await client.getList<GetBlogListResponse>({
    endpoint: "blog",
    queries: { ...queries, filters },
  });
};
