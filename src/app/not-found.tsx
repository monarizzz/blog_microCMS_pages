import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

const NotFound = () => {
  return (
    <LayoutMain>
      <div className="mx-auto flex w-full max-w-275 flex-col items-center justify-center gap-6 px-10 py-16">
        <p className="text-[70px] font-bold">404</p>
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-xl font-bold">ページがありません。</h1>
          <p className="text-base">
            お探しのページは移動または削除された可能性があります。
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-button bg-primary px-7 py-3.5 text-on-primary"
        >
          <ArrowLeft size={16} />
          <span> ホームに戻る</span>
        </Link>
      </div>
    </LayoutMain>
  );
};
export default NotFound;
