const endpoint = "blog";

export const getDraftBlog = async ({ limit }: { limit: number }) => {
  const res = await fetch(
    `https://1sdrqfaqhy.microcms-management.io/api/v1/contents/${endpoint}?limit=${limit}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.API_KEY!,
      },
    },
  );
  return await res.json();
};
