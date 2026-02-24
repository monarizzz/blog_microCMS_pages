import Link from "next/link";
import relativeDate from "@/features/blog/utils/relativeDate";
import TagButton from "@/commons/tag/components/TagButton/TagButton";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

type Props = {
  BlogWithPlainText: BlogWithPlainText;
};

const BlogCard = ({ BlogWithPlainText }: Props) => {
  return (
    <div className="group rounded-2xl bg-white transition hover:-translate-y-0.5">
      <div className="mb-2">
        {BlogWithPlainText.categories ? (
          <TagButton category={BlogWithPlainText.categories} maxLength={4} />
        ) : null}
      </div>
      <div className="ml-2 mt-3">
        <Link href={`/blog/${BlogWithPlainText.id}`}>
          <p className="mb-2 line-clamp-2 text-xl font-bold text-black group-hover:text-gray-700">
            {BlogWithPlainText.title}
          </p>
          <p className="mb-2 block text-xs text-gray-400">
            {relativeDate(BlogWithPlainText.publishedAt)}
          </p>
          <p className="mt-2 line-clamp-3 break-words text-sm text-gray-600">
            {BlogWithPlainText.plainTextBody}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
