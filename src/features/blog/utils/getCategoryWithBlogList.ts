import { getBlogList } from "@/infra/microCMS/repositories/contens/getBlogList";
import { getCategoriesList } from "@/infra/microCMS/repositories/contens/getCategoriesList";
import { BlogsByCategory } from "@/libs/schema/contents/Category/category";
import { getPlainText } from "@/features/blog/utils/getPlainText";

/**
 * カテゴリごとのブログ記事リストを取得し、各記事にプレーンテキストの要約を付与します。
 * @returns {Promise<BlogsByCategoryList>} 整形されたブログカテゴリリスト
 */
export const getCategoryWithBlogList = async (): Promise<BlogsByCategory[]> => {
  // 1. 全カテゴリを取得
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const categoryIds = categoryData.contents.map((category) => category.id);

  // 2. カテゴリIDごとに、関連するブログ記事リストを並列で取得
  const blogListByCategory = await Promise.all(
    categoryIds.map((categoryId) =>
      getBlogList({
        queries: { limit: 10, filters: `categories[contains]${categoryId}` },
      }),
    ),
  );

  // 3. 取得したブログリストを整形
  const blogCategoryList = categoryData.contents.map((category, index) => {
    const blogs = blogListByCategory[index].contents;

    // 各ブログ記事の本文をプレーンテキストに変換
    const blogWithPlainTextList = blogs.map((blog) => ({
      ...blog,
      plainTextBody: getPlainText(blog.body),
    }));

    return {
      category: {
        id: category.id,
        name: category.name,
      },
      blogWithPlainTextList,
    };
  });

  return blogCategoryList;
};
