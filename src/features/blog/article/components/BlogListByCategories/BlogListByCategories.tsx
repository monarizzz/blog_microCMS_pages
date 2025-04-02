import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import { NextPage } from "next";

type Props = {
  blogCategoryList: BlogCategoryList;
};

const BlogListByCategories: NextPage<Props> = ({ blogCategoryList }) => {
  return (
    <>
      {blogCategoryList.map((category) => (
        <>
          <div key={category.id}>
            <div>{category.name}</div>
            {category.blogList.contents.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default BlogListByCategories;
