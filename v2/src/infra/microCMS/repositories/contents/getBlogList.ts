import { client } from "@/libs/microCMS/utils/client";
import {
  GetBlogListRequest,
  GetBlogListResponse,
} from "../../entities/contents/blog";

export const getBlogList = async ({ queries }: GetBlogListRequest) => {
  const envFilter = `development_env[contains]${process.env.DEPLOYMENT_ENVIRONMENTS}`;
  const filters = queries?.filters
    ? `${queries.filters}[and]${envFilter}`
    : envFilter;

  return await client.getList<GetBlogListResponse>({
    endpoint: "blog",
    queries: { ...queries, filters, orders: "-publishedAt" },
  });
};
