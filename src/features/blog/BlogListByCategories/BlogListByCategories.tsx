import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogList } from "@/infra/microCMS/schema/blogList";
import { CategoryList } from "@/infra/microCMS/schema/categoryList";
import { NextPage } from "next";

type Props = {
  category: CategoryList;
  blogListObject: any;
};

const BlogListByCategories: NextPage<Props> = ({
  category,
  blogListObject,
}) => {
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
