import type { MetadataRoute } from "next";
import { siteUrl } from "@/commons/constants/site";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // 検索結果はクエリ次第で無限に URL が生えるためクロール対象から外す
    disallow: "/search",
  },
  sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  host: siteUrl,
});

export default robots;
