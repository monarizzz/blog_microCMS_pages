import { NextPage } from "next";
import BlogListByCategories from "../BlogListByCategories/BlogListByCategories";

type Props = {};

const TagFilter: NextPage<Props> = ({ categoryID }) => {
  return <BlogListByCategories blogCategoryList={blogCategoryList} />;
};

export default TagFilter;
