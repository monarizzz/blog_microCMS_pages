import dayjs from "dayjs";
import { SVG_UPDATE } from "@/libs/utils/blog/update";
import { Blog } from "@/libs/schema/contents/Blog/blog";
import Image from "next/image";

type Props = {
  blog: Blog;
};

const PostDate = ({ blog }: Props) => {
  return (
    <div className="flex justify-end gap-3 text-sm text-gray-400">
      <p>{dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}</p>
      {blog.publishedAt !== blog.revisedAt && (
        <div className="flex">
          {/* TODO:svgの色をあわせる */}
          <Image
            src={SVG_UPDATE.SRC}
            alt={SVG_UPDATE.ALT}
            width={15}
            height={15}
            className="mr-1"
          />
          <p>{dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm")}</p>
        </div>
      )}
    </div>
  );
};

export default PostDate;
