"use client";

import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";

const NotFound = () => {
  return (
    <LayoutMain session={null}>
      <main className="main">
        <p>ページがありません。</p>
      </main>
    </LayoutMain>
  );
};
export default NotFound;
