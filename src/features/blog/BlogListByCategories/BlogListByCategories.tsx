import BlogCard from "@/commons/blog/BlogCard/BlogCard";

type Props = {};

const BlogListByCategories = ({ category, blogListObject }) => {
  return (
    <>
      {blogListObject.map((categories, index: string) => (
        <>
          <div key={index}>
            <div>{categories.name}</div>
            {categories.blogList.contents.map((blog) => BlogCard({ blog }))}
          </div>
        </>
      ))}
    </>
  );
};

export default BlogListByCategories;
