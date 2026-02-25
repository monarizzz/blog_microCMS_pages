import Link from "next/link";
import relativeDate from "@/features/blog/utils/relativeDate";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";
import TagButton from "@/commons/tag/components/TagButton/TagButton";

type Props = {
  BlogWithPlainText: BlogWithPlainText;
};

const BlogCard = ({ BlogWithPlainText }: Props) => {
  return (
    <div className="group min-h-44 rounded-md bg-white p-3 shadow transition hover:-translate-y-1 lg:min-h-52">
      <div className="mb-2">
        {BlogWithPlainText.categories ? (
          <TagButton category={BlogWithPlainText.categories} maxLength={4} />
        ) : null}
      </div>
      <div className="ml-2 mt-3">
        <Link href={`/blog/${BlogWithPlainText.id}`}>
          <p className="mb-2 line-clamp-2 text-base font-bold text-black group-hover:text-gray-700">
            {BlogWithPlainText.title}
          </p>
          <p className="mb-2 block text-[0.625rem] text-gray-400">
            {relativeDate(BlogWithPlainText.publishedAt)}
          </p>
          <p className="mt-2 line-clamp-2 break-words text-[0.6875rem] leading-5 tracking-wide text-gray-500 lg:line-clamp-3">
            {BlogWithPlainText.plainTextBody}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
