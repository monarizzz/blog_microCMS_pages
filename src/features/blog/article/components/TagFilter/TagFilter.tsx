import { NextPage } from "next";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  queryID: string;
  blogCategoryList: BlogCategoryList;
  category: CategoryList;
};

const TagFilter: NextPage<Props> = ({
  queryID,
  blogCategoryList,
  category,
}) => {
  return (
    <>
      {blogCategoryList.map((blogCategory) => (
        <>
          {blogCategory.id == queryID ? (
            <>
              <div>{blogCategory.name}</div>
              {blogCategory.blogList.contents.map((blogList) => (
                <BlogCard
                  key={blogCategory.id}
                  blog={blogList}
                  category={category}
                />
              ))}
            </>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
