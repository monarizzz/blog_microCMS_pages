import Link from "next/link";
import Image from "next/image";

const GithubBtn = () => {
  return (
    <div>
      <Link href="https://github.com/monarizzz/blog_microCMS_pages">
        <Image
          src="/github-mark.svg"
          alt="github"
          width={40}
          height={40}
          className="hover:[filter:invert(0.5)]"
        />
      </Link>
    </div>
  );
};

export default GithubBtn;
