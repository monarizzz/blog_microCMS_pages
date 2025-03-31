import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { NextPage } from "next";

type Props = {
  blogListObject: any;
};

const BlogListByCategories: NextPage<Props> = ({ blogListObject }) => {
  return (
    <>
      {blogListObject.map((categories, index: string) => (
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
