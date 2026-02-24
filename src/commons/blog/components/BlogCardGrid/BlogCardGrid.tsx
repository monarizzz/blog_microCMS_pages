import BlogCard from "../BlogCard/BlogCard";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  blogWithPlainTextList: BlogWithPlainText[];
};

const BlogCardGrid = ({ blogWithPlainTextList }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogWithPlainTextList.map((BlogWithPlainText: BlogWithPlainText) => (
        <div key={BlogWithPlainText.id} className="w-full">
          <BlogCard BlogWithPlainText={BlogWithPlainText} />
        </div>
      ))}
    </div>
  );
};

export default BlogCardGrid;
