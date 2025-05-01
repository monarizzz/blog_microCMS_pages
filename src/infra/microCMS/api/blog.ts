import { MicroCMSQueries } from "microcms-js-sdk";
import { Blog } from "../schema/Blog/blog";

export type GetBlogListRequest = { queries: MicroCMSQueries };
export type GetBlogListResponse = Blog;
