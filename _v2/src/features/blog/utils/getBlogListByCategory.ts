import { getBlogList } from "@/infra/microCMS/repositories/contents/getBlogList";
import { Category } from "@/libs/schema/contents/Category/category";
import getPlainText from "@/features/blog/utils/getPlainText";
import { MicroCMSListResponse } from "microcms-js-sdk";

export const getBlogListByCategory = async (
  categoryData: MicroCMSListResponse<Category>,
) => {
  const ids = categoryData.contents.map((category) => category.id);
  const blogListByCategory = await Promise.all(
    ids.map((id) =>
      getBlogList({
        queries: { limit: 10, filters: `categories[contains]${id}` },
      }),
    ),
  );

  const blogCategoryList = categoryData.contents.map((category, index) => {
    const blogs = blogListByCategory[index].contents;

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
