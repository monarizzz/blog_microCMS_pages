export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categories: [id: string];
  title: string;
  body: any;
};
