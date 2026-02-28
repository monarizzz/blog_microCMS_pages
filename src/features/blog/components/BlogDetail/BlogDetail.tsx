import style from "./BlogDetail.module.scss";
import Link from "next/link";
import { Blog } from "@/libs/schema/contents/Blog/blog";
import { Category } from "@/libs/schema/contents/Category/category";
import PostDate from "../PostDate/PostDate";
import PageNav from "../PageNav/PageNav";
import Toc from "../Toc/Toc";
import tocFn from "../../utils/tocFn";
import { BlogNavigation } from "../../types/blogNavigation";
import TagButton from "@/commons/tag/components/TagButton/TagButton";

type Props = {
  blog: Blog;
  category: Category[];
  blogNavigation: BlogNavigation;
};

const BlogDetail = ({ blog, category, blogNavigation }: Props) => {
  const toc = tocFn(blog.body);
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="w-full pb-4 pt-8">
        <TagButton category={category} />
        <div className="mb-16 mt-7 text-center text-xl font-bold">
          {blog.title}
        </div>
        <div className="text-sm">
          <PostDate blog={blog} />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="w-full min-w-0 lg:max-w-4xl">
          <div className="min-h-36 rounded-lg bg-zinc-50 p-5">
            <div
              className={style.article}
              dangerouslySetInnerHTML={{
                __html: blog.body,
              }}
            />
          </div>
          <div className="my-40">
            <PageNav blogNavigation={blogNavigation} />
          </div>
          <div className="my-72">
            <Link
              href="/"
              className="text-sm font-bold text-indigo-800 hover:underline"
            >
              ← 記事一覧に戻る
            </Link>
          </div>
        </div>
        <div className="hidden xl:sticky xl:top-4 xl:block xl:h-fit xl:w-64 xl:self-start">
          <Toc toc={toc} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
