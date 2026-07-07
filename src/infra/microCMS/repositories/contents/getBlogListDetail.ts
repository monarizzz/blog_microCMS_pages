import { client } from "@/libs/microCMS/utils/client";

type Props = {
  contentId: string;
  draftKey?: string;
};

const getBlogListDetail = async ({ contentId, draftKey }: Props) => {
  return await client.getListDetail({
    endpoint: "blog",
    contentId: `${contentId}`,
    queries: draftKey ? { draftKey } : undefined,
  });
};

export default getBlogListDetail;
