export type Session = {
  expires: string;
  user?:
    | {
        email?: string | null | undefined;
        image?: string | null | undefined;
        name?: string | null | undefined;
      }
    | undefined;
};
