import { Category } from "@/libs/schema/contents/Category/category";
import { MicroCMSQueries } from "microcms-js-sdk";

export type GetCategoryListRequest = { queries: MicroCMSQueries };
export type GetCategoryListResponse = Category;
