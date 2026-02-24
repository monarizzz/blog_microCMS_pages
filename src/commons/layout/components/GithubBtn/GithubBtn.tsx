import Link from "next/link";
import Image from "next/image";

const GithubBtn = () => {
  const size = 40;
  return (
    <div>
      <Link href="https://github.com/monarizzz/blog_microCMS_pages">
        <Image
          src="/github-mark.svg"
          alt="github"
          width={size}
          height={size}
          className="hover:[filter:invert(0.5)]"
        />
      </Link>
    </div>
  );
};

export default GithubBtn;
