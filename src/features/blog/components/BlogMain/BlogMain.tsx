"use client";

import {
  Category,
  BlogsByCategory,
} from "@/libs/schema/contents/Category/category";
import CategorizedBlogList from "../CategorizedBlogList/CategorizedBlogList";
import { useSearchParams } from "next/navigation";
import TagButton from "@/commons/tag/components/TagButton/TagButton";

type Props = {
  category: Category[];
  categoryWithBlogList: BlogsByCategory[];
};

const BlogMain = ({ category, categoryWithBlogList }: Props) => {
  const queryId = useSearchParams()?.get("cat") ?? undefined;
  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="mb-5 mt-20 text-right">
        <TagButton category={category} />
      </div>
      <CategorizedBlogList
        queryId={queryId}
        blogCategoryList={categoryWithBlogList}
      />
    </div>
  );
};

export default BlogMain;
