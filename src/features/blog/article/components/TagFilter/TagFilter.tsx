import { NextPage } from "next";
import { BlogCategoryList } from "@/infra/microCMS/schema/BlogCategory/blogCategoryList";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";

type Props = {
  queryID: string;
  blogCategoryList: BlogCategoryList;
};

const TagFilter: NextPage<Props> = ({ queryID, blogCategoryList }) => {
  return (
    <>
      {blogCategoryList.map((blogCategory) => (
        <>
          {blogCategory.id == queryID ? (
            <>
              <div>{blogCategory.name}</div>
              {blogCategory.blogList.contents.map((blogList) => (
                <BlogCard key={blogCategory.id} blog={blogList} />
              ))}
            </>
          ) : null}
        </>
      ))}
    </>
  );
};
export default TagFilter;
