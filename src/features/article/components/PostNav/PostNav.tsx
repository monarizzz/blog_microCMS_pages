import { cn } from "@/infra/Tailwind/cn";

import type { PostNavigation } from "../../types/postNavigation";
import PostNavLink from "../PostNavLink/PostNavLink";

type Props = PostNavigation;

const PostNav = ({ prev, next }: Props) => {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="前後の記事"
      className="w-full border-t border-outline-variant pt-8"
    >
      <div className="flex w-full items-start justify-between">
        {prev && (
          <div
            className={cn(
              "flex w-full",
              // 区切り線は前後が並んだときだけ意味を持つ
              next && "border-r border-outline-variant",
            )}
          >
            <PostNavLink
              direction="prev"
              title={prev.title}
              href={`/article/${prev.id}`}
            />
          </div>
        )}
        {next && (
          <div className="flex w-full">
            <PostNavLink
              direction="next"
              title={next.title}
              href={`/article/${next.id}`}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default PostNav;
