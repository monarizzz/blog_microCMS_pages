import type { MetadataRoute } from "next";
import { siteUrl } from "@/commons/constants/site";
import { getArticle } from "@/infra/microCMS/api/getArticle";

/**
 * sitemap は既定でビルド時に一度だけ生成され、以降キャッシュされる。
 * microCMS で記事を追加・更新しても反映されず、初回生成時に API が失敗すると
 * `getAllArticles` の catch が返した記事ゼロの sitemap が固定されてしまうため、
 * 1 時間で再検証する。値は「記事公開の反映がこの程度遅れても許容できる」という
 * こちらの判断で、仕様上の根拠がある数字ではない。
 */
export const revalidate = 3600;

/** microCMS の 1 リクエストあたりの上限 */
const MICROCMS_MAX_LIMIT = 100;

/** robots.ts で disallow している /search は含めない */
const staticPaths = ["/", "/article", "/tags", "/service", "/profile"];

/**
 * 記事を上限まで辿って全件取得する。
 * 取得に失敗した場合は静的ページだけの sitemap を返したいので、
 * 例外は握り潰して空配列にする。
 */
const getAllArticles = async () => {
  try {
    const articles: { id: string; updatedAt: string }[] = [];

    for (let offset = 0; ; offset += MICROCMS_MAX_LIMIT) {
      const { contents, totalCount } = await getArticle({
        limit: MICROCMS_MAX_LIMIT,
        offset,
        fields: "id,updatedAt",
        orders: "-publishedAt",
      });

      articles.push(
        ...contents.map(({ id, updatedAt }) => ({ id, updatedAt })),
      );

      if (articles.length >= totalCount || contents.length === 0) {
        return articles;
      }
    }
  } catch {
    return [];
  }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const articles = await getAllArticles();

  return [
    ...staticPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: new URL(`/article/${article.id}`, siteUrl).toString(),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
};

export default sitemap;
