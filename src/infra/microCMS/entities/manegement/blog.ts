import { MenageBlog } from "@/libs/schema/manegement/MenageBlog";

export type getDraftBlogResponse = {
  contents: Pick<MenageBlog, "id" | "status" | "draftKey">[];
};
