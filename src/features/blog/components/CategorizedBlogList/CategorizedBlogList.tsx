import { BlogsByCategory } from "@/libs/schema/contents/Category/category";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";

type Props = {
  queryId?: string;
  blogCategoryList: BlogsByCategory[];
};

const CategorizedBlogList = ({ queryId, blogCategoryList }: Props) => {
  const filteredCategories = queryId
    ? blogCategoryList.filter(
        (blogCategory) => blogCategory.category.id === queryId,
      )
    : blogCategoryList;

  return (
    <>
      {filteredCategories.map((blogCategory) => (
        <div key={blogCategory.category.id} className="mb-20">
          <p className="mb-4 text-lg font-bold text-slate-900">
            {blogCategory.category.name}
          </p>
          <BlogCardGrid
            blogWithPlainTextList={blogCategory.blogWithPlainTextList}
          />
        </div>
      ))}
    </>
  );
};

export default CategorizedBlogList;
