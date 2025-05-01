import { MicroCMSQueries } from "microcms-js-sdk";
import { Category } from "../schema/Category/category";

export type GetBlogListRequest = { queries: MicroCMSQueries };
export type GetBlogListResponse = Category;
