import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { NextPage } from "next";

type Props = {
  blogCategoryList: BlogCategoryList;
};

const BlogListByCategories: NextPage<Props> = ({ blogCategoryList }) => {
  return (
    <>
      {blogCategoryList.map((categories, index) => (
        <>
          <div key={index}>
            <div>{categories.name}</div>
            {categories.blogList.contents.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default BlogListByCategories;
