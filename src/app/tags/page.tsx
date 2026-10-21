import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import TagsPageMain from "@/features/tags/components/TagsPageMain/TagsPageMain";

export const metadata = buildPageMetadata({
  title: "タグ",
  description: "タグごとに記事を絞り込んで探せます。",
  path: "/tags",
});

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

const TagsPage = async ({ searchParams }: Props) => {
  const { tag } = await searchParams;

  return (
    <LayoutMain>
      <TagsPageMain activeTag={tag} />
    </LayoutMain>
  );
};

export default TagsPage;
