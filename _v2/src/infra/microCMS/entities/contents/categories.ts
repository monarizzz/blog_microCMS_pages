import { Category } from "@/libs/schema/contents/Category/category";
import { MicroCMSQueries } from "microcms-js-sdk";

export type GetBlogListRequest = { queries: MicroCMSQueries };
export type GetBlogListResponse = Category;
