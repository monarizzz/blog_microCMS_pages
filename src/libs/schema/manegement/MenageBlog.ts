export type MenageBlog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  revisedAt: string | null;
  closedAt: string | null;
  status: string[];
  customStatus: object[] | null;
  draftKey: string | null;
  createdBy: string;
  updatedBy: string;
  reservationTime: {
    publishTime: string | null;
    stopTime: string | null;
  } | null;
};
