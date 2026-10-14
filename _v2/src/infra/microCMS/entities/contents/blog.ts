import { Blog } from "@/libs/schema/contents/Blog/blog";
import { MicroCMSQueries } from "microcms-js-sdk";

export type GetBlogListRequest = { queries: MicroCMSQueries };
export type GetBlogListResponse = Blog;
