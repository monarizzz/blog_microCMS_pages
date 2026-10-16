import type { MetadataRoute } from "next";
import { siteUrl } from "@/commons/constants/site";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // `/search` の除外は disallow ではなくページ側の noindex
    // (src/app/search/page.tsx) で行う。robots.txt で Disallow すると
    // クローラがページを取得できず meta robots の noindex を読めないため、
    // 外部リンク経由で URL だけがインデックスされうる
    // (Google の "Indexed, though blocked by robots.txt")
  },
  sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  host: siteUrl,
});

export default robots;
