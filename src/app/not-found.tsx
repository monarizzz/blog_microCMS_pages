import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <LayoutMain>
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="text-[70px] font-bold">404</span>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-2xl font-bold">ページがありません。</span>
          <span className="text-base">
            お探しのページは移動または削除された可能性があります。
          </span>
        </div>

        <Link
          href="./"
          className="bg-primary text-on-primary rounded-button flex items-center justify-center gap-2 px-7 py-3.5"
        >
          <ArrowLeft size={16} />
          <span> ホームに戻る</span>
        </Link>
      </div>
    </LayoutMain>
  );
};
export default NotFound;
