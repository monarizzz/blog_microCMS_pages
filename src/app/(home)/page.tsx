import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";

// metadata は定義しない。`src/app/layout.tsx` が title の default・og:url・
// canonical をいずれも "/" 向けに持っているため、ここで buildPageMetadata を
// 使うと title が「Home | Monelog」になってサイト名が出なくなる

const Home = () => {
  // 仮置きの本棚データは HomePageMain から外した。microCMS の取得は次のコミットで繋ぐ
  return <HomePageMain blogShelf={[]} serviceShelf={[]} />;
};

export default Home;
