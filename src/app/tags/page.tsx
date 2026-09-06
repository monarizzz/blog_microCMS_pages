import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import TagsPageMain from "@/features/tags/components/TagsPageMain/TagsPageMain";

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
