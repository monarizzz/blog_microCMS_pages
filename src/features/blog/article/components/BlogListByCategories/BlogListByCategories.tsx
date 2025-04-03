import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { NextPage } from "next";

type Props = {
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

const BlogListByCategories: NextPage<Props> = ({
  blogCategoryList,
  category,
}) => {
  return (
    <>
      {blogCategoryList.map((blogCategory) => (
        <>
          <div key={blogCategory.id}>
            <div>{blogCategory.name}</div>
            {blogCategory.blogList.contents.map((blog) => (
              <BlogCard key={blog.id} blog={blog} category={category} />
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default BlogListByCategories;
