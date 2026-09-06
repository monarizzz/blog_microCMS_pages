import { Category } from "@/libs/schema/contents/Category/category";
import BlogCardGrid from "@/commons/blog/components/BlogCardGrid/BlogCardGrid";
import { UTILS_HOME } from "@/libs/utils/blog/home/home";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  blogsWithPlainText: BlogWithPlainText[];
  category: Category[];
};

const HomeMain = ({ blogsWithPlainText }: Props) => {
  return (
    <div className="my-6 max-w-7xl mx-auto w-4/5">
      <p className="my-20 text-2xl font-bold">{UTILS_HOME.HOME}</p>
      <BlogCardGrid blogWithPlainTextList={blogsWithPlainText} />
    </div>
  );
};

export default HomeMain;
