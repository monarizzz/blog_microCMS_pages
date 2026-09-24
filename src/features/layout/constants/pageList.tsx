export type PageListItem = {
  label: string;
  path: string;
};

export const pageList: readonly PageListItem[] = [
  { label: "Tags", path: "/tags" },
  { label: "Service", path: "/service" },
  { label: "Profile", path: "/profile" },
];
